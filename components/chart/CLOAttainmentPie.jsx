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
import * as ss from 'simple-statistics';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CLOAttainmentPie = (props) => {

  const comps = Object.keys(props.clomap);
  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(labels.length).fill(0);
  const target = props.target;

  if(props.cAvg && props.avgLOS){

    const CLOAvg = {}
    comps.forEach(clo => {
      let temp = props.clomap[clo];
      CLOAvg[clo] = 0;
      temp.forEach(elm => {
        CLOAvg[clo] += props.cAvg[elm];
      });
      CLOAvg[clo] /= temp.length;

      CLOAvg[clo] += props.avgLOS[clo];

      CLOAvg[clo] /= 2
    })


    comps.forEach(elm => {
      if(CLOAvg[elm] > target[1]){dataValue[0] += 1;}
      else if(CLOAvg[elm ]<= target[1] && CLOAvg[elm] >= target[0]){dataValue[1] += 1;}
      else if(CLOAvg[elm] < target[0]){dataValue[2] += 1;}
    });
  }
  else if(props.avgLOS){
    comps.forEach(elm => {
      if(props.avgLOS[elm] > target[1]){dataValue[0] += 1;}
      else if(props.avgLOS[elm ]<= target[1] && props.avgLOS[elm] >= target[0]){dataValue[1] += 1;}
      else if(props.avgLOS[elm] < target[0]){dataValue[2] += 1;}
    });
  }
  else if(props.cAvg){
    const CLOAvg = {}
    comps.forEach(clo => {
      let temp = props.clomap[clo];
      CLOAvg[clo] = 0;
      temp.forEach(elm => {
        CLOAvg[clo] += props.cAvg[elm];
      });
    CLOAvg[clo] /= temp.length;
    })


    comps.forEach(elm => {
      if(CLOAvg[elm] > target[1]){dataValue[0] += 1;}
      else if(CLOAvg[elm ]<= target[1] && CLOAvg[elm] >= target[0]){dataValue[1] += 1;}
      else if(CLOAvg[elm] < target[0]){dataValue[2] += 1;}
    });
  }

  let sumValues = dataValue.reduce((a, b) => a + b, 0);

  for (let i = 0; i < dataValue.length ; i++) {
    dataValue[i] = (dataValue[i] / sumValues) * 100;
  }

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
    //     // display: false,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Percentage of Achieved LOs by ${props.title || 'Grad'}`,
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
        data = {data}
        options={option}
/>

}

export default CLOAttainmentPie;
