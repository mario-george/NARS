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

const Grad2Litter = (props) => {

  const labels = ["A+", "A", "A–", "B+", "B", "B–", "C+", "C", "C–", "D+", "D", "F"];
  const dataValue = new Array(labels.length).fill(0);

  const rb = [66, 213]

  const backGround = labels.map(elm => {

    const out = `rgb(${rb[0]}, 96, ${rb[1]})`;
    rb[0] += props.grid || 15;
    rb[1] -= props.grid || 15;

    return out
  })

  
  props.data.forEach(elm => {
    if(elm >= 94){dataValue[0] += 1;}
    else if(elm < 94 && elm >= 85){dataValue[1] += 1;}
    else if(elm < 85 && elm >= 80){dataValue[2] += 1;}
    else if(elm < 80 && elm >= 75){dataValue[3] += 1;}
    else if(elm < 75 && elm >= 70){dataValue[4] += 1;}
    else if(elm < 70 && elm >= 67){dataValue[5] += 1;}
    else if(elm < 67 && elm >= 64){dataValue[6] += 1;}
    else if(elm < 64 && elm >= 60){dataValue[7] += 1;}
    else if(elm < 60 && elm >= 57){dataValue[8] += 1;}
    else if(elm < 57 && elm >= 54){dataValue[9] += 1;}
    else if(elm < 54 && elm >= 50){dataValue[10] += 1;}
    else{dataValue[11] += 1;}
  });
  
  return <Bar
        data = {{
      labels,
      datasets: [{
        label: props.title || 'Final',
        data: dataValue,
        backgroundColor: backGround,
        borderWidth: 1,
        maxBarThickness: 80
      }
    ]
    }}
        height = {props.h || 20 }
        width = {props.w  || 60}

        option = {{
          maintainAspectRatio: false,
          scales: {
        y: {
          beginAtZero: true
        }
      }
        }}
  />



}

export default Grad2Litter;
