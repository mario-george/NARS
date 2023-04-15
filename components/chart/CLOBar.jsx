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

const CLOBar = (props) => {

  const labels = Object.keys(props.clomap);
  const dataValue = new Array(labels.length).fill(0);

  
  labels.forEach((elm, i) => {
    //question for competencies
    const comps = props.clomap[elm];
    //competencies value
    let cqstemp = 0;
    
    comps.forEach(elm => {
      cqstemp += props.cAvg[elm];
    });
    cqstemp /= comps.length;
    
    dataValue[i] = cqstemp;
  });
  

  const rb = [66, 213]
  
  // const backGround = labels.map((elm, i) => {
  //   const grid = props.grid || 20;
  //   const r = rb[0] - Math.round(dataValue[i] / 10) * grid * (1 + 10 * (dataValue[i] < 50));
  //   const b = rb[1] + Math.round(dataValue[i] / 10) * grid * (1 + 10 * (dataValue[i] > 50));
  //   const out = `rgb(${r}, 10, ${b})`;
    
  //   return out
  // })
  
  return <Bar
        data = {{
      labels,
      datasets: [{
        label: `LO Assessment by ${props.title || "Grad"}`,
        data: dataValue,
        backgroundColor: 'rgba(119, 221, 119, 1)',
        borderWidth: 1,
        maxBarThickness: 80
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
                text: 'LOs',
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

export default CLOBar;
