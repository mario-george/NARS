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
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const AttainmentPie = (props) => {

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
        type: 'pie',
        label: 'Competencies Attainment',
        data: dataValue,
        backgroundColor: [
          'rgba(119, 221, 119, 0.2)',
          'rgba(108, 160, 220, 0.2)',
          'rgba(255, 105, 97, 0.2)',
        ],
        borderColor: [
          'rgba(119, 221, 119, 1)',
          'rgba(108, 160, 220, 1)',
          'rgba(255, 105, 97, 1)',
        ],
        borderWidth: 1,
      },
    ]
  }


  const option = {
    scales: {
    
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Percentage of Achieved Competencies by ${props.title || 'Grad'}`,
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

  return <Pie 
    data={data}
    options={option}
    />


}

export default AttainmentPie;
