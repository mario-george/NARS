import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



const StudentScatter = (props) => {

  const dataValue = []

  for (let i = 0; i < props.snum; i++) {
    let temp = {
      x: props.midd[i],
      y: props.finald[i]
    }
    
    dataValue.push(temp);
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const data = {
    datasets: [
      {
        label: props.title || 'Mid to Final',
        data: dataValue,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return <Scatter options={options} data={data} />;
}


export default StudentScatter;