import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GradPie = (props) => {
  const labels = ['90-100', '80-90', '60-80', '50-60', '0-50'];
  const dataValue = new Array(labels.length).fill(0);

  props.data.forEach(elm => {
    if(elm >= 90){dataValue[0] += 1;}
    else if(elm < 80 && elm >= 80){dataValue[1] += 1;}
    else if(elm < 80 && elm >= 60){dataValue[2] += 1;}
    else if(elm < 60 && elm >= 50){dataValue[3] += 1;}
    else{dataValue[4] += 1;}
  });

  const data = {
    labels,
    datasets: [
      {
        label: props.title || 'Grads',
        data: dataValue,
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: true,

      text: props.title || 'Grads'
    }
  }


  return <Pie 
    data={data}
    height = {props.h || 20 }
    width = {props.w  || 60}
    />;
}

export default GradPie;
