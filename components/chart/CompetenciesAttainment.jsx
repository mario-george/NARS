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
import * as ss from 'simple-statistics';;

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CompetenciesAttainment = (props) => {

  const comps = Object.keys(props.cmap);
  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(comps.length).fill(new Array(labels.length).fill(0));
  const target = props.target || new Array(comps.length).fill([50, 80]);
  const out = [];

  

  const doMath = (elm, i) => {
    //question for competence
    const cqs = props.cmap[elm];
    //competence value
    // let cqstemp = new Array(props.snum).fill(0);
    
    // cqs.forEach(elm => {
    //   for (let i = 0; i < props.snum; i++) {
    //     cqstemp[i] += props.qs[elm][i] / cqs.length;        
    //   }
    // });

    // cqs.forEach(elm => {
    if(cqs > target[i][1]){dataValue[i][0] += 1;}
    else if(cqs <= target[i][1] && cqs >= target[i][0]){dataValue[i][1] += 1;}
    else if(cqs < target[i][0]){dataValue[i][2] += 1;}
    // });
    // console.log(cqs);
  
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
            data = {data}
            height = {props.h || 20 }
            width = {props.w  || 60}
            key = {elm}
            option = {option4bar}
      />)
  })
  
  return <>
  {out.map(elm => elm)}
  </>



}

export default CompetenciesAttainment;
