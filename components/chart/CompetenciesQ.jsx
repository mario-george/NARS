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

const CompetenciesQ = (props) => {
  const labels = Object.keys(props.cmap);
  const dataValue = [];

  labels.forEach((elm) => {
    //question for competencies
    const comqs = props.cmap[elm];
    dataValue.push(comqs.length)
  });


  return (
    <Bar
        data = {{
      labels,
      datasets: [{
        label: `Number of ${props.title || "Questions"} for each Competence`,
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
            x: {
              title: {
                display: true,
                text: 'Competencies',
                color: '#999',
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
                text: `Number of ${props.title || "Questions"}`,
                color: '#999',
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
  )
}

export default CompetenciesQ;
