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
import ChartDataLabels from 'chartjs-plugin-labels';
// import ss from "simple-statistics";
// import "chartjs-plugin-datalabels";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartDataLabels
);

const AttainmentPie = (props) => {

  const labels = ["Above Target", "At Target", "Below Target"];
  const dataValue = new Array(labels.length).fill(0);
  const target = props.target;

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
      },},
      plugins: {
        tooltips: {
          enabled: false
        },
        datalabels: {
            formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += data;
                });
                let percentage = (value*100 / sum).toFixed(2)+"%";
                return percentage;
            },
            color: '#000',
        }
    }
  }

  return <Pie 
    data={data}
    options={option}
    plugins={[ChartDataLabels]}
    />


}

export default AttainmentPie;
