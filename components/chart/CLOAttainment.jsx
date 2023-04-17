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
  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(labels.length).fill(0);
  const target = props.target;

  if(props.cAvg && props.avgLOS){
    const CLOAvg = {}
    comps.forEach(clo => {
      let temp = props.clomap[clo];
      CLOAvg[clo] = 0;
      temp.forEach(elm => {
        CLOAvg[clo] += props.cAvg[elm];
      });

      CLOAvg[clo] += props.avgLOS[clo];

      CLOAvg[clo] /= 2
    })


    comps.forEach(elm => {
      if(CLOAvg[elm] > target[1]){dataValue[0] += 1;}
      else if(CLOAvg[elm ]<= target[1] && CLOAvg[elm] >= target[0]){dataValue[1] += 1;}
      else if(CLOAvg[elm] < target[0]){dataValue[2] += 1;}
    });
  }
  else if(props.avgLOS){
    comps.forEach(elm => {
      if(props.avgLOS[elm] > target[1]){dataValue[0] += 1;}
      else if(props.avgLOS[elm ]<= target[1] && props.avgLOS[elm] >= target[0]){dataValue[1] += 1;}
      else if(props.avgLOS[elm] < target[0]){dataValue[2] += 1;}
    });
  }
  else if(props.cAvg){
    const CLOAvg = {}
    comps.forEach(clo => {
      let temp = props.clomap[clo];
      CLOAvg[clo] = 0;
      temp.forEach(elm => {
        CLOAvg[clo] += props.cAvg[elm];
      });
    })


    comps.forEach(elm => {
      if(CLOAvg[elm] > target[1]){dataValue[0] += 1;}
      else if(CLOAvg[elm ]<= target[1] && CLOAvg[elm] >= target[0]){dataValue[1] += 1;}
      else if(CLOAvg[elm] < target[0]){dataValue[2] += 1;}
    });
  }

  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  const data = {
      labels,
      datasets: [{
        label: 'LOs Attainment',
        data: dataValue,
        backgroundColor: bg,
        borderWidth: 1,
        maxBarThickness: 80
      },
    ]
  }

  const option4bar = {
      indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attainment'
      }
    },
    scales: {
      
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Number of Achieved LOs by ${props.title || 'Grad'}`,
          color: '#777',
        font: {
          family: 'Times',
          size: 20,
          style: 'normal',
          lineHeight: 1.2
        },
        padding: {top: 30, left: 0, right: 0, bottom: 0}
        },
      },}
  }

  return <Bar
        data = {data}
        height = {props.h || 20 }
        width = {props.w  || 60}

        options = {option4bar}
/>

}

export default CLOAttainment;
