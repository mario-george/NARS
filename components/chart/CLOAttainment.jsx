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
  // const dataValue = new Array(comps.length).fill(new Array(labels.length).fill(0));
  const dataValue = new Array(labels.length).fill(0);
  const target = [30, 70]
  const out = [];

  const CLOAvg = {}
  comps.forEach(clo => {
    let temp = props.clomap[clo];
    CLOAvg[clo] = 0;
    temp.forEach(elm => {
      CLOAvg[clo] += props.cAvg[elm];
    });
  })

  // const value2percentage = (a) =>{
  //   let sumIt = ss.sum(a)
  //   for (let i = 0; i < a.length; i++) {
  //     a[i] = a[i] / sumIt * 100;
      
  //   }
  // };

  // const doMath = (elm, i) => {
  //   //competencies for clo
  //   let cqs = props.clomap[elm];
    
  //   cqs.forEach(elm => {
  //     if(props.cAvg[elm] > target[i][1]){dataValue[i][0] += 1;}
  //     else if(props.cAvg[elm]<= target[i][1] && props.cAvg[elm] >= target[i][0]){dataValue[i][1] += 1;}
  //     else if(props.cAvg[elm] < target[i][0]){dataValue[i][2] += 1;}
  //   });
  //   value2percentage(dataValue[i]);
  // } 

  // const getBackground = (a) => {
  //   return a.map((elm, i) => {

  //     if(i !== 2){if(elm <= 50){
  //         const b = 208 - (Math.round(elm / 10)) * 40;
  //         const out = `rgb(215, 48, ${b})`;
  
  //         return out
  //       }
  //       else{
  //         const r = 208 - (Math.round(elm / 10) - 5) * 40;
  //         const out = `rgb(${r}, 48, 215)`;
  
  //         return out
  //       }}
  //       else{if(elm <= 50){
  //         const r = 208 - (Math.round(elm / 10)) * 40;
  //         const out = `rgb(${r}, 48, 215)`;
  
  //         return out
  //       }
  //       else{
  //         const b = 208 - (Math.round(elm / 10) - 5) * 40;
  //         const out = `rgb(215, 48, ${b})`;
  
  //         return out
  //       }}
  //   });
  // }

  

  // comps.forEach((elm, i) => {
  //   doMath(elm, i);

  //   let data = {
  //     labels,
  //     datasets: [{
  //       label: `${elm} Attainment`,
  //       data: dataValue[i],
  //       backgroundColor: getBackground(dataValue[i]),
  //       borderWidth: 1,
  //       maxBarThickness: 80
  //     },
  //   ]
  //   }
  //   const option4bar = {
  //     indexAxis: 'y',
  //   // Elements options apply to all of the options unless overridden in a dataset
  //   // In this case, we are setting the border of each horizontal bar to be 2px wide
  //   elements: {
  //     bar: {
  //       borderWidth: 2,
  //     }
  //   },
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'right',
  //     },
  //     title: {
  //       display: true,
  //       text: `${elm} Attainment`,
  //     }
  //   }
  // ,}
  //   out.push(<Bar
  //           className=' mt-10'
  //           data = {data}
  //           height = {props.h || 20 }
  //           width = {props.w  || 60}
  //           key = {elm}
  //           option = {option4bar}
  //     />)
  // })
  
  // return <div className='flex flex-col justify-center items-center m-20 mt-10'>
  // {out.map(elm => elm)}
  // </div>

  comps.forEach(elm => {
    if(CLOAvg[elm] > target[1]){dataValue[0] += 1;}
    else if(CLOAvg[elm ]<= target[1] && CLOAvg[elm] >= target[0]){dataValue[1] += 1;}
    else if(CLOAvg[elm] < target[0]){dataValue[2] += 1;}
  });

  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  const data = {
      labels,
      datasets: [{
        label: 'Achieved LOs',
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

export default CLOAttainment;
