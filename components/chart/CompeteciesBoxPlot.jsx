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
// import { b } from 'react-chartjs-2';
import { BoxPlotController, BoxAndWiskers, BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
import { useRef } from 'react';

ChartJS.register(
  BoxPlotController,
  BoxAndWiskers,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CompetenciesBoxPlot = (props) => {

  const labels = Object.keys(props.cmap);
  const dataValue = new Array(labels.length).fill(0);

  labels.forEach((elm, i) => {
    //question for competence
    const cqs = props.cmap[elm];
    //competence value
    let cqstemp = new Array(props.snum).fill(0);
    
    cqs.forEach(elm => {
      for (let i = 0; i < props.snum; i++) {
        cqstemp[i] += props.qs[elm][i] / cqs.length;        
      }
    });
    dataValue[i] = cqstemp;
  });
  
  const ref = useRef(null);

  
  const whenLoaded = (e) => {
    if(ref.current){
      new BoxPlotChart(
        ref.current,{
          data: {
                labels,
                datasets: [{
                  label: 'Grad',
                  data: dataValue,
                  backgroundColor: 'rgba(213, 108, 108, .5)',
                  boarderColor: 'rgb(213, 108, 108)',
                  borderWidth: 1,
                  maxBarThickness: 80
                }
              ]
            },
            height: props.h || 20,
            width: props.w  || 60,
            options: {
              responsive: true,
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Competencies`
              }
          }
        }
      )
    }
  }

  setTimeout(whenLoaded, 100);

  return <canvas ref={ref}></canvas>
  
}

export default CompetenciesBoxPlot;
