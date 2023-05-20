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
import { Bar, Chart } from 'react-chartjs-2';

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
  const target = props.target;
  let data = {};
  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  Object.keys(props.cAvg).forEach(elm => {
    if(props.cAvg[elm] > target[1]){dataValue[0] += 1;}
    else if(props.cAvg[elm ]<= target[1] && props.cAvg[elm] >= target[0]){dataValue[1] += 1;}
    else if(props.cAvg[elm] < target[0]){dataValue[2] += 1;}
  });

  if(props.avgS){
    const dataValues = [
      new Array(labels.length).fill(0),
      new Array(labels.length).fill(0),
    ];

    Object.keys(props.avgS[0]).forEach(elm => {
      if(props.avgS[0][elm] > target[1]){dataValues[0][0] += 1;}
      else if(props.avgS[0][elm ]<= target[1] && props.avgS[0][elm] >= target[0]){dataValues[0][1] += 1;}
      else if(props.avgS[0][elm] < target[0]){dataValues[0][2] += 1;}
    });
    Object.keys(props.avgS[1]).forEach(elm => {
      if(props.avgS[1][elm] > target[1]){dataValues[1][0] += 1;}
      else if(props.avgS[1][elm ]<= target[1] && props.avgS[1][elm] >= target[0]){dataValues[1][1] += 1;}
      else if(props.avgS[1][elm] < target[0]){dataValues[1][2] += 1;}
    });
    data = {
      labels,
      datasets: [
      // {
      //   label: 'Direct Attainment',
      //   data: dataValues[0],
      //   backgroundColor: bg,
      //   borderWidth: 1,
      //   maxBarThickness: 80
      // },
      // {
      //   label: 'Indirect Attainment',
      //   data: dataValues[1],
      //   backgroundColor: bg,
      //   borderWidth: 1,
      //   maxBarThickness: 80
      // },
      {
        label: 'Overall Attainment',
        data: dataValue,
        backgroundColor: bg,
        borderWidth: 1,
        maxBarThickness: 80
      },
    ]
  }
  }
  else{
    data = {
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
        text: `Number of Achieved Competencies by ${props.title || 'Grad'}`,
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

export default Attainment;
