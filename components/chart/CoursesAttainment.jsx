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

const CoursesAttainment = (props) => {
  // target, courses, w, h

  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValues = [
    new Array(labels.length).fill(0),
    new Array(labels.length).fill(0),
    new Array(labels.length).fill(0),
  ];

  const target = props.target;
  let data = {};
  const bg  = [
    'rgba(119, 221, 119, 1)',
    'rgba(108, 160, 220, 1)',
    'rgba(255, 105, 97, 1)',
  ];

  Object.keys(props.courses).forEach(elm => {
    if(props.courses[elm]['direct'] > target[1]){dataValues[0][0] += 1;}
    else if(props.courses[elm]['direct']<= target[1] && props.courses[elm]['direct'] >= target[0])
    {dataValues[0][1] += 1;}
    else if(props.courses[elm]['direct'] < target[0]){dataValues[0][2] += 1;}

    if(props.courses[elm]['indirect'] > target[1]){dataValues[1][0] += 1;}
    else if(props.courses[elm]['indirect']<= target[1] && props.courses[elm]['indirect'] >= target[0])
    {dataValues[1][1] += 1;}
    else if(props.courses[elm]['indirect'] < target[0]){dataValues[1][2] += 1;}

    if(props.courses[elm]['avg'] > target[1]){dataValues[2][0] += 1;}
    else if(props.courses[elm]['avg']<= target[1] && props.courses[elm]['avg'] >= target[0])
    {dataValues[2][1] += 1;}
    else if(props.courses[elm]['avg'] < target[0]){dataValues[2][2] += 1;}
  });

  // console.log("dataValues", dataValues)
  // console.log("props.courses", props.courses)

  data = {
    labels,
    datasets: [
    {
      label: 'Direct Attainment',
      data: dataValues[0],
      backgroundColor: bg[0],
      borderWidth: 1,
      maxBarThickness: 80
    },
    {
      label: 'Indirect Attainment',
      data: dataValues[1],
      backgroundColor: bg[1],
      borderWidth: 1,
      maxBarThickness: 80
    },
    {
      label: 'Overall Attainment',
      data: dataValues[2],
      backgroundColor: bg[2],
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
        text: `Number of Achieved Courses`,
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

export default CoursesAttainment;
