import JsonToTable  from "./JSonToTable";

const CLOTable = (props) => {
  const labels = Object.keys(props.clomap);
  const dataValue = {};

  labels.forEach((elm) => {
    //question for CLO
    const cloqs = new Set();
    //competencies for CLO
    const clocmp = props.clomap[elm];

    let comp = {}

    clocmp.forEach(elm => {
      //question for competencies
      const cqs = props.cmap[elm];

      comp[elm] = props.cmap[elm];
      
      cqs.forEach(elm => {
        cloqs.add(elm);
      });
    })
    dataValue[elm] = {Question: Array.from(cloqs), Competencies: comp}
  });

  return (
    <JsonToTable json={dataValue} tableClassName="some"/>
  )
}

export default CLOTable;
