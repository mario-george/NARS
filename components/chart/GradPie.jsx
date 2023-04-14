import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GradPie = (props) => {
  const labels = ['Success', 'Fail'];
  const dataValue = new Array(labels.length).fill(0);

  props.data.forEach(elm => {
    if(elm >= 50){dataValue[0] += 1;}
    // else if(elm < 80 && elm >= 80){dataValue[1] += 1;}
    // else if(elm < 80 && elm >= 60){dataValue[2] += 1;}
    // else if(elm < 60 && elm >= 50){dataValue[3] += 1;}
    else{dataValue[1] += 1;}
  });

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
    }
  }


  return <Pie 
    data={data}
    height = {props.h || 20 }
    width = {props.w  || 60}
    />;
}

export default GradPie;
