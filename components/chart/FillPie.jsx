import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FillPie = (props) => {
  // title, title2, num, h, w
  const labels = ['Filled', 'Not Filled'];

  const data = {
    labels,
    datasets: [
      {
        label: props.title || "Fill",
        data: props.num,
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

      text: props.title || 'Fill'
    },
    scales: {
    
      x: {
    //     // display: false,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Percentage of Filled ${props.title2}`,
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

export default FillPie;
