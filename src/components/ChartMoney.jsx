import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useApiGet } from "../services/apiService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartMoney = () => {
     const [chartData, setChartData] = useState({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
               {
                    label: 'Pemasukan',
                    data: Array(12).fill(0),
                    borderColor: '#00a8e8',
               },
               {
                    label: 'Pengeluaran',
                    data: Array(12).fill(0),
                    borderColor: '#bf0603',
               }
          ]
     });

     const getDataChart = useCallback(async () => {
          try {
               const userId = localStorage.getItem("userId");
               const response = await useApiGet(`/get-all-note/${userId}`);

               const notes = response?.data?.showAllNotes;

               if (!notes || !Array.isArray(notes)) {
                    console.log("Invalid data received from API");
                    return;
               }

               const monthlyIncome = Array(12).fill(0);
               const monthlyExpense = Array(12).fill(0);

               notes.forEach(note => {
                    const date = new Date(note.date);
                    const month = date.getMonth();

                    if (note.noteType === 'Pemasukan') {
                         monthlyIncome[month] += parseFloat(note.price) || 0;
                    } else if (note.noteType === 'Pengeluaran') {
                         monthlyExpense[month] += parseFloat(note.price) || 0;
                    }
               });

               setChartData(prevChartData => ({
                    ...prevChartData,
                    datasets: [
                         { ...prevChartData.datasets[0], data: monthlyIncome },
                         { ...prevChartData.datasets[1], data: monthlyExpense },
                    ],
               }));
          } catch (error) {
               console.log("Error fetching chart data:", error);
          }
     }, []);

     useEffect(() => {
          // data chart fetch
          getDataChart();

          // Set up polling
          const intervalId = setInterval(() => {
               getDataChart();
          }, 1000);

          // Clean up on component unmount
          return () => clearInterval(intervalId);
     }, [getDataChart]);

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'top',
               },
               title: {
                    display: true,
                    text: 'Laporan Pemasukan dan Pengeluaran',
               },
          },
     };

     return (
          <div className="grid grid-cols-1 relative m-auto w-[80vw] h-[40vh] md:w-[70vw] md:h-[50vh] lg:w-[60vw] lg:h-[60vh]">
               <Line options={options} data={chartData} />
          </div>
     );
};

export default ChartMoney;
