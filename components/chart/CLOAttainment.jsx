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
import * as ss from 'simple-statistics';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CLOAttainment = (props) => {

  const comps = Object.keys(props.clomap);
  // console.log("clo", props.clomap);
  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(comps.length).fill(new Array(labels.length).fill(0));
  const target = props.target || new Array(comps.length).fill([50, 80]);
  const out = [];
  const cmap = {};
  props.cmap.forEach(elm => {
    let temp = Object.keys(elm)[0];    
    cmap[temp] = elm[temp];
  })

  const value2percentage = (a) =>{
    let sumIt = ss.sum(a)
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] / sumIt * 100;
      
    }
  };

  const doMath = (elm, i) => {
    //competencies for clo
    let cqs = props.clomap[elm];
    
    cqs.forEach(elm => {
      if(cmap[elm] > target[i][1]){dataValue[i][0] += 1;}
      else if(cmap[elm]<= target[i][1] && cmap[elm] >= target[i][0]){dataValue[i][1] += 1;}
      else if(cmap[elm] < target[i][0]){dataValue[i][2] += 1;}
    });
    value2percentage(dataValue[i]);
  } 

  const getBackground = (a) => {
    return a.map((elm, i) => {

      if(i !== 2){if(elm <= 50){
          const b = 208 - (Math.round(elm / 10)) * 40;
          const out = `rgb(215, 48, ${b})`;
  
          return out
        }
        else{
          const r = 208 - (Math.round(elm / 10) - 5) * 40;
          const out = `rgb(${r}, 48, 215)`;
  
          return out
        }}
        else{if(elm <= 50){
          const r = 208 - (Math.round(elm / 10)) * 40;
          const out = `rgb(${r}, 48, 215)`;
  
          return out
        }
        else{
          const b = 208 - (Math.round(elm / 10) - 5) * 40;
          const out = `rgb(215, 48, ${b})`;
  
          return out
        }}
    });
  }

  

  comps.forEach((elm, i) => {
    doMath(elm, i);

    let data = {
      labels,
      datasets: [{
        label: `${elm} Attainment`,
        data: dataValue[i],
        backgroundColor: getBackground(dataValue[i]),
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
        text: `${elm} Attainment`,
      }
    }
  ,}
    out.push(<Bar
            className=' mt-10'
            data = {data}
            height = {props.h || 20 }
            width = {props.w  || 60}
            key = {elm}
            option = {option4bar}
      />)
  })
  
  return <div className='flex flex-col justify-center items-center m-20 mt-10'>
  {out.map(elm => elm)}
  </div>



}

export default CLOAttainment;
