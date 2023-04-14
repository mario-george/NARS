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
  const cmap = {};
  props.cmap.forEach(elm => {
    let temp = Object.keys(elm)[0];    
    cmap[temp] = elm[temp];
  })


  const dataValue = new Array(labels.length).fill(0);
  const tempValue = {}

  // //question name
  // const qstemp = Object.keys(props.qs);
  // //question average
  // const temp = qstemp.map(elm => (props.qs[elm].reduce((a, b) => a + b, 0)) / props.snum);
  // const qs = {};
  // //{name: average}
  // qstemp.forEach((element, index) => {
  //   qs[element] = temp[index]
  // });
  
  
  
  // competencies.forEach((elm) => {
  //   //question for competencies
  //   const cqs = props.cmap[elm];
  //   //competencies value
  //   let cqstemp = 0;
    
  //   cqs.forEach(elm => {
  //     cqstemp += qs[elm];
  //   });
  //   cqstemp /= cqs.length;
    
  //   tempValue[elm] = cqstemp;
  // });

  
  labels.forEach((elm, i) => {
    //question for competencies
    const comps = props.clomap[elm];
    //competencies value
    let cqstemp = 0;
    
    comps.forEach(elm => {
      cqstemp += cmap[elm];
    });
    cqstemp /= comps.length;
    
    dataValue[i] = cqstemp;
  });
  

  const rb = [66, 213]
  
  const backGround = labels.map((elm, i) => {
    const grid = props.grid || 20;
    const r = rb[0] - Math.round(dataValue[i] / 10) * grid * (1 + 10 * (dataValue[i] < 50));
    const b = rb[1] + Math.round(dataValue[i] / 10) * grid * (1 + 10 * (dataValue[i] > 50));
    const out = `rgb(${r}, 10, ${b})`;
    
    return out
  })
  
  return <Bar
        data = {{
      labels,
      datasets: [{
        label: `LO Assessment by ${props.title || "Grad"}`,
        data: dataValue,
        backgroundColor: backGround,
        borderWidth: 1,
        yAxisID: "comb",
        maxBarThickness: 80
      }
    ]
    }}
        height = {props.h || 20 }
        width = {props.w  || 60}

        option = {{
          maintainAspectRatio: false,
          scales: {
            comb: {
              type: "linear",
              beginAtZero: false,
              max:50,
              min: 0,
              position: 'right'
            }
      }
        }}
  />



}

export default CLOBar;
