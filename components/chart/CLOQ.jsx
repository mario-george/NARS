import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CLOQ = (props) => {
  const labels = Object.keys(props.clomap);
  const dataValue = [];

  labels.forEach((elm) => {
    //question for CLO
    const cloqs = new Set();
    //competencies for CLO
    const clocmp = props.clomap[elm];

    clocmp.forEach(elm => {
      //question for competencies
      const cqs = props.cmap[elm];
      
      cqs.forEach(elm => {
        cloqs.add(elm);
      });
    })
    dataValue.push(Array.from(cloqs).length)
  });

  return (
    <Bar
        data = {{
      labels,
      datasets: [{
        label: `Number of ${props.title || "Questions"} for each LO`,
        data: dataValue,
        backgroundColor: 'rgb(20, 20, 150)',
        borderWidth: 1,
        maxBarThickness: 80
      }
    ]
    }}
        height = {props.h || 20 }
        width = {props.w  || 60}

        option = {{
          maintainAspectRatio: false,
          scales: {
        y: {
          beginAtZero: true
        }
      }
        }}
  />
  )
}

export default CLOQ;
