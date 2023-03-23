
import * as ss from 'simple-statistics';
import { useEffect, useRef } from 'react';
import MyPlot from './MyPlot';

const GradHist = (props) => {

  const dataMax = Math.round(ss.max(props.data));
  const dataMin = Math.round(ss.min(props.data));
  const dataValue = new Array(dataMax - dataMin).fill(0);
  const labels = dataValue.map((elm, i) => i);

  const histRef = useRef(null)

  useEffect(() => {
    props.data.forEach(elm => {
      dataValue[Math.round(elm)] += 1
    });
    const data = [{
                  x: props.data,
                  type: 'histogram',
                  xbins: {
                    start: 0,
                    size: 5,
                    end: 100,
                  },
                },
                // {
                //   x: props.data,
                //   type: 'distplot',
                //   xbins: {
                //     start: 0,
                //     size: 20,
                //     end: 100,
                //   },
                // }
              ]
    const layout = {
      title: 'Grad histogram',
      showlegend: false,
      xaxis: {
        range: [dataMin, dataMax],
      },
      yaxis: {
        gridwidth: 2
      },
      width: props.w || 5000,
      hight: props.h || 100,
    };

    const config = {
      responsive: true,
      staticPlot: true,
    }

    MyPlot({ref: histRef, data: data, layout: layout, config: config});
}, [])

  const rb = [66, 213]

  const backGround = dataValue.map(elm => {

    const out = `rgb(${rb[0]}, 96, ${rb[1]})`;
    rb[0] += props.grid || 15;
    rb[1] -= props.grid || 15;

    return out
  })

  
  

  return <div ref={histRef}></div>



}

export default GradHist;
