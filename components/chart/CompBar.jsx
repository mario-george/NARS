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

const CompBar = (props) => {
  // target, courses, w, h

  const labels = Object.keys(props.comp);

  const dataValues = [
    new Array(labels.length).fill(0),
    new Array(labels.length).fill(0),
    new Array(labels.length).fill(0),
  ];

  const target = props.target;
  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  labels.forEach((elm, i) => {
    dataValues[0][i] = props.comp[elm]['direct'];
    dataValues[1][i] = props.comp[elm]['indirect'];
    dataValues[2][i] = props.comp[elm]['avg'];
  });
  
  return <Bar
        data = {{
      labels,
      datasets: [{
        label: `Direct Assessment`,
        data: dataValues[0],
        backgroundColor: bg[0],
        borderWidth: 1,
        maxBarThickness: 80,
      },{
        label: `Indirect Assessment`,
        data: dataValues[1],
        backgroundColor: bg[1],
        borderWidth: 1,
        maxBarThickness: 80,
      },{
        label: `Overall Assessment`,
        data: dataValues[2],
        backgroundColor: bg[2],
        borderWidth: 1,
        maxBarThickness: 80,
      }
    ]
    }}
        height = {props.h || 20 }
        width = {props.w  || 60}

        options = {{
          aspectRatio: 1,
          maintainAspectRatio: true,
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
              max: 100,
              title: {
                display: true,
                text: `Achieved Percentage %`,
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

export default CompBar;
