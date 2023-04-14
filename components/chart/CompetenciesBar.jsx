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
  const dataValue = new Array(props.cmap.length).fill(0);

  // //question name
  // const qstemp = Object.keys(props.qs);
  // //question average
  // const temp = []
  // for (let i = 0; i < qstemp.length; i++) {
  //   const elm = qstemp[i];
  //   temp.push(props.qs[elm].reduce((a, b) => a + b, 0));
  //   temp[i] = temp[i] / props.snum;
  // }
  // const qs = {};
  // //{name: average}
  // qstemp.forEach((element, index) => {
  //   qs[element] = temp[index]
  // });
  
  
  
  props.cmap.forEach((elm, i) => {
    //question for competencies
    let temp = Object.keys(elm)[0];
    labels.push(temp)
    
    dataValue[i] = elm[temp];
  });
  

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
        data: dataValue,
        backgroundColor: backGround,
        borderWidth: 1,
        maxBarThickness: 80,
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
                text: `Achieved Percentage`,
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



}

export default CompetenciesBar;
