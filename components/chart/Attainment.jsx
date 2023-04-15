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
  const target = [36, 70]

  Object.keys(props.cAvg).forEach(elm => {
    if(props.cAvg[elm] > target[1]){dataValue[0] += 1;}
    else if(props.cAvg[elm ]<= target[1] && props.cAvg[elm] >= target[0]){dataValue[1] += 1;}
    else if(props.cAvg[elm] < target[0]){dataValue[2] += 1;}
  });

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

  const dataChart = {
    labels,
    datasets: [{
      type: 'bar',
      label: 'Competencies Attainment',
      data: dataValue,
      backgroundColor: bg,
      borderWidth: 1,
      maxBarThickness: 80
    },
    {
      type: 'pie',
      label: 'Competencies Attainment',
      data: dataValue,
      backgroundColor: [
        'rgba(255, 105, 97, 0.2)',
        'rgba(108, 160, 220, 0.2)',
        'rgba(119, 221, 119, 0.2)',
      ],
      borderColor: [
        'rgba(255, 105, 97, 1)',
        'rgba(108, 160, 220, 1)',
        'rgba(119, 221, 119, 1)',
      ],
      borderWidth: 1,
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

  // return <Chart type='bar' data={dataChart} />


}

export default Attainment;
