import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GradPie = (props) => {
  const labels = ['Passed', 'Failed'];
  const dataValue = new Array(labels.length).fill(0);

  props.data.forEach(elm => {
    if(elm >= 50){dataValue[0] += 1;}
    // else if(elm < 80 && elm >= 80){dataValue[1] += 1;}
    // else if(elm < 80 && elm >= 60){dataValue[2] += 1;}
    // else if(elm < 60 && elm >= 50){dataValue[3] += 1;}
    else{dataValue[1] += 1;}
  });

  let sumValues = dataValue.reduce((a, b) => a + b, 0);

  for (let i = 0; i < dataValue.length ; i++) {
    dataValue[i] = (dataValue[i] / sumValues) * 100;
  }

  const data = {
    labels,
    datasets: [
      {
        label: props.title || 'Grads',
        data: dataValue,
        backgroundColor: [
          'rgba(119, 221, 119, 0.2)',
          // 'rgba(126, 96, 153, 0.2)',
          // 'rgba(156, 96, 123, 0.2)',
          // 'rgba(186, 96, 93, 0.2)',
          'rgba(255, 105, 97, 0.2)',
        ],
        borderColor: [
          'rgba(119, 221, 119, 1)',
          // 'rgba(126, 96, 153, 1)',
          // 'rgba(156, 96, 123, 1)',
          // 'rgba(186, 96, 93, 1)',
          'rgba(255, 105, 97, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: true,

      text: props.title || 'Grads'
    },
    scales: {
    
      x: {
    //     // display: false,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Percentage of Passed & Failed`,
          color: '#777',
        font: {
          family: 'Times',
          size: 20,
          style: 'normal',
          lineHeight: 1.2
        },
        padding: {top: 30, left: 0, right: 0, bottom: 0}
        },
      },
      }
  }


  return <Pie 
    data={data}
    height = {props.h || 20 }
    width = {props.w  || 60}
    options = {options}
    />;
}

export default GradPie;
