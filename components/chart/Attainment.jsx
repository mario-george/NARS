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
  const lastDataValue = new Array(labels.length).fill(0);

  const value2percentage = (a) =>{
    let sumit = a.reduce((a, b) => (a+b), 0)
    for (let i = 0; i < a.length; i++) {
      a[i] = a[i] / sumit * 100;
      
    }
  };

  Object.keys(props.nowd).forEach(elm => {
    if(props.nowd[elm] > props.target[1]){dataValue[0] += 1;}
    else if(props.nowd[elm ]<= props.target[1] && props.nowd[elm] >= props.target[0]){dataValue[1] += 1;}
    else if(props.nowd[elm] < props.target[0]){dataValue[2] += 1;}
  });

  Object.keys(props.lastd).forEach(elm => {
    if(props.lastd[elm] > props.target[1]){lastDataValue[0] += 1;}
    else if(props.lastd[elm] <= props.target[1] && props.lastd[elm] >= props.target[0]){lastDataValue[1] += 1;}
    else if(props.lastd[elm] < props.target[0]){lastDataValue[2] += 1;}
  });

  value2percentage(dataValue);
  value2percentage(lastDataValue);

  const backGround = dataValue.map((elm, i) => {

    if(i !== 2){if(elm <= 50){
        const b = 208 - (Math.round(elm / 10)) * 40;
        const out = `rgb(215, 48, ${b})`;

        return out
      }
      else{
        const r = 208 - (Math.round(elm / 10) - 5) * 40;
        const out = `rgb(${r}, 48, 215)`;

        return out
      }}
      else{if(elm <= 50){
        const r = 208 - (Math.round(elm / 10)) * 40;
        const out = `rgb(${r}, 48, 215)`;

        return out
      }
      else{
        const b = 208 - (Math.round(elm / 10) - 5) * 40;
        const out = `rgb(215, 48, ${b})`;

        return out
      }}
  });

  const lastBackGround = lastDataValue.map((elm, i) => {

      if(i !== 2){if(elm <= 50){
        const g = 208 - (Math.round(elm / 10)) * 40;
        const out = `rgb(215, ${g}, 48)`;

        return out
      }
      else{
        const r = 208 - (Math.round(elm / 10) - 5) * 40;
        const out = `rgb(${r}, 215, 48)`;

        return out
      }}
      else{if(elm <= 50){
        const r = 208 - (Math.round(elm / 10)) * 40;
        const out = `rgb(${r}, 215, 48)`;

        return out
      }
      else{
        const g = 208 - (Math.round(elm / 10) - 5) * 40;
        const out = `rgb(215, ${g}, 48)`;

        return out
      }}

  })

  const data = {
      labels,
      datasets: [{
        label: 'This Year',
        data: dataValue,
        backgroundColor: backGround,
        borderWidth: 1,
        maxBarThickness: 80
      },
      {
        label: 'Last Year',
        data: lastDataValue,
        backgroundColor: lastBackGround,
        borderWidth: 1,
        maxBarThickness: 80
      }
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



}

export default Attainment;
