import JsonToTable from "./JSonToTable";
import * as ss from 'simple-statistics'

const CompetenciesStatisticsTable = (props) => {
  const labels = Object.keys(props.cmap);
  const dataValue = [];
  const wantedDataValue = new Array(labels.length).fill(0);

  labels.forEach((elm, i) => {
    //question for competencies
    const cqs = props.cmap[elm];
    //competencies value
    let cqstemp = new Array(props.snum).fill(0);
    
    cqs.forEach(elm => {
      for (let i = 0; i < props.snum; i++) {
        cqstemp[i] += props.qs[elm][i] / cqs.length;        
      }
    });
    wantedDataValue[i] = cqstemp;
  });
  

  const getSkewness = (a) => {
    let temp = ss.sampleSkewness(a);

    let normal = props.normal || .1;
    
    if (temp > normal){return "Right Skewness";}
    else if(temp < - normal){return "Left Skewness";}
    else{return "Almost Normal";}
    
    
  }

  const countAtTarget = (a) => {
    let tempo = 0;
    let target = props.target || [50, 80]
    let below = target[0];
    let above = target[1];
    a.forEach(elm => {
      if(elm >= below && elm <= above){tempo++}
    })

    return tempo;
  }

  const countAboveTarget = (a) => {
    let tempo = 0;
    let target = props.target || [50, 80]
    let above = target[1];
    a.forEach(elm => {
      if(elm > above){tempo++}
    })

    return tempo;
  }

  const countBelowTarget = (a) => {
    let tempo = 0;
    let target = props.target || [50, 80]
    let below = target[0];
    a.forEach(elm => {
      if(elm < below){tempo++}
    })

    return tempo;
  }

  labels.forEach((elm, i) => {
    const willAdded = {
      competence: elm,
      // IQR: ss.iqr(wantedDataValue[i]).toFixed(2),
      max: ss.max(wantedDataValue[i]).toFixed(2),
      min: ss.min(wantedDataValue[i]).toFixed(2),
      mean: ss.mean(wantedDataValue[i]).toFixed(2),
      median: ss.median(wantedDataValue[i]).toFixed(2),
      // below_target: countBelowTarget(wantedDataValue[i]),
      // at_target: countAtTarget(wantedDataValue[i]),
      // above_target: countAboveTarget(wantedDataValue[i]),
      // Q1: ss.quantile(wantedDataValue[i], .25).toFixed(2),
      // Q2: ss.quantile(wantedDataValue[i], .5).toFixed(2),
      // Q3: ss.quantile(wantedDataValue[i], .75).toFixed(2),
      // mode: ss.mode(wantedDataValue[i]).toFixed(2),
      skewness: getSkewness(wantedDataValue[i]),
      // stv: ss.sampleStandardDeviation(wantedDataValue[i]).toFixed(2),
    }
    dataValue.push(willAdded);
  });


  return (
    <JsonToTable json={dataValue} tableClassName="some" />
  )
}

export default CompetenciesStatisticsTable;
