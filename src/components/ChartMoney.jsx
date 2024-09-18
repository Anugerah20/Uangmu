import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useApiGet } from '../services/apiService';

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

     const getDataChart = async () => {
          try {
               const userId = localStorage.getItem("userId");
               const response = await useApiGet(`/get-note/${userId}`);
               const notes = response.data.showNotes;

               // Menyimpan data pemasukan serta pengeluaran berdasarkan bulan
               const monthlyIncome = Array(12).fill(0);
               const monthlyExpense = Array(12).fill(0);

               notes.forEach(note => {
                    const date = new Date(note.date);
                    const month = date.getMonth();

                    if (note.noteType === 'Pemasukan') {
                         monthlyIncome[month] += note.price;
                    } else if (note.noteType === 'Pengeluaran') {
                         monthlyExpense[month] += note.price;
                    }
               });

               // Memperbarui chart data
               setChartData(prevChartData => ({
                    labels: prevChartData.labels,
                    datasets: [
                         { ...prevChartData.datasets[0], data: monthlyIncome },
                         { ...prevChartData.datasets[1], data: monthlyExpense },
                    ],
               }));

          } catch (error) {
               console.log("Error fetching chart data:", error);
          }
     };

     useEffect(() => {
          getDataChart();
     }, []);

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
          <div className="flex flex-col mx-auto w-[80%]">
               <Line options={options} data={chartData} />
          </div>
     );
};

export default ChartMoney;
