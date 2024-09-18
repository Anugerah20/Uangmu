import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js'

ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend
)

const ChartMoney = () => {

     const options = {
          reponsive: true,
          plugins: {
               legend: {
                    position: 'top'
               },
               title: {
                    display: true,
                    text: 'Laporan Pemasukan dan Pengeluaran'
               }
          }
     }

     const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'],
          datasets: [
               {
                    label: 'Pemasukan',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    // fill: false,
                    // backgroundColor: 'rgb(75, 192, 192)',
                    borderColor: 'green',
               },
               {
                    label: 'Pengeluaran',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    // fill: false,
                    // backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'red',
               },
          ],
     }

     return (
          <div className="mx-12 w-full">
               <Line options={options} data={data} />
          </div>
     );
}

export default ChartMoney;
