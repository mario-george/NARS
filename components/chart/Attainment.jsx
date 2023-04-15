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

const Attainment = (props) => {

  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(labels.length).fill(0);
  const target = [36, 70]
  // const cAvg = {};
  // props.cAvg.forEach(elm => {
  //   let temp = Object.keys(elm)[0];    
  //   cAvg[temp] = elm[temp];
  // })

  // const value2percentage = (a) =>{
  //   let sumit = a.reduce((a, b) => (a+b), 0)
  //   for (let i = 0; i < a.length; i++) {
  //     a[i] = a[i] / sumit * 100;
      
  //   }
  // };

  Object.keys(props.cAvg).forEach(elm => {
    if(props.cAvg[elm] > target[1]){dataValue[0] += 1;}
    else if(props.cAvg[elm ]<= target[1] && props.cAvg[elm] >= target[0]){dataValue[1] += 1;}
    else if(props.cAvg[elm] < target[0]){dataValue[2] += 1;}
  });


  // value2percentage(dataValue);

  // const backGround = dataValue.map((elm, i) => {

  //   if(i !== 2){if(elm <= 50){
  //       const b = 208 - (Math.round(elm / 10)) * 40;
  //       const out = `rgb(215, 48, ${b})`;

  //       return out
  //     }
  //     else{
  //       const r = 208 - (Math.round(elm / 10) - 5) * 40;
  //       const out = `rgb(${r}, 48, 215)`;

  //       return out
  //     }}
  //     else{if(elm <= 50){
  //       const r = 208 - (Math.round(elm / 10)) * 40;
  //       const out = `rgb(${r}, 48, 215)`;

  //       return out
  //     }
  //     else{
  //       const b = 208 - (Math.round(elm / 10) - 5) * 40;
  //       const out = `rgb(215, 48, ${b})`;

  //       return out
  //     }}
  // });

  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  const data = {
      labels,
      datasets: [{
        label: 'Competencies Attainment',
        data: dataValue,
        backgroundColor: bg,
        borderWidth: 1,
        maxBarThickness: 80
      },
    ]
  }

  const option4bar = {
      indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Attainment'
      }
    }
  ,}
  
  return <Bar
        data = {data}
        height = {props.h || 20 }
        width = {props.w  || 60}

        option = {option4bar}
  />



}

export default Attainment;
