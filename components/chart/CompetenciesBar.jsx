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

const CompetenciesBar = (props) => {

  const labels = [];

  const rb = [66, 213]
  
  const backGround = labels.map((elm, i) => {
    const grid = props.grid || 20;
    const r = rb[0] - Math.round(dataValue[i] / 10) * grid * (1 + 3 * (dataValue[i] < 50));
    const b = rb[0] + Math.round(dataValue[i] / 10) * grid * (1 + 3 * (dataValue[i] > 50));
    const out = `rgb(${r}, 10, ${b})`;
    
    return out
  })
  
  return <Bar
        data = {{
      labels,
      datasets: [{
        label: `Competence Assessment by ${props.title || "Grad"}`,
        data: props.cAvg,
        backgroundColor: backGround,
        borderWidth: 1,
        maxBarThickness: 80,
      }
    ]
    }}
        height = {props.h || 20 }
        width = {props.w  || 60}

        options = {{
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Competencies',
                color: '#777',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {top: 20, left: 0, right: 0, bottom: 0}
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: `Achieved Percentage`,
                color: '#777',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {top: 30, left: 0, right: 0, bottom: 0}
              },
            },
      }
        }}
  />



}

export default CompetenciesBar;
