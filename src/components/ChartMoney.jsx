import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartMoney = () => {
     const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
               {
                    label: 'Earnings',
                    data: [3000, 2000, 4000, 5000, 7000, 6000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
               },
          ],
     };

     const options = {
          scales: {
               y: {
                    beginAtZero: true,
               },
          },
     };

     return (
          <div className="mx-12">
               <h1 className="my-5">Laporan Data Keuangan</h1>
               <Line data={data} options={options} />
          </div>
     );
}

export default ChartMoney;
