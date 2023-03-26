const getData = (props) => {
  const competenciesMap = {};
  const snum = props.data[0].grads;
  const exam = {
    final: new Array(snum).fill(0),
    midterm: new Array(snum).fill(0),
    quiz: new Array(snum).fill(0)
  };
  // const examQNum = {
  //   final: 0,
  //   mid: 0,
  //   quiz: 0
  // };
  const examQGrad = {
    final: 0,
    midterm: 0,
    quiz: 0
  };
  const qs = {};

  props.data.forEach((elm, i) => {
    const fm = elm.fullMarks;
    const elmType = elm.type;
    examQGrad[elmType] += fm;
    elm.grads.forEach((elm, i) => {
      exam[elmType][i] += elm;//(elm / fm) * 100;
    });
    const q = `${elm.type}${i}`;
    qs[q] = elm.grads;
    elm.competences.forEach((elm, i) => {
      if(!competenciesMap[elm]){
        competenciesMap[elm] = new Set();
        competenciesMap[elm].add(q);
      }else{
        competenciesMap[elm].add(q);
      }
    })
  })

  Object.keys(competenciesMap).forEach(elm => {
    let temp = competenciesMap[elm];
    competenciesMap[elm] = Array.from(temp)
  });

  
  Object.keys(examQGrad).forEach(elm => {
    // const elmType = elm;
      if (examQGrad[elm]) {
        for (let i = 0; i < exam[elm].length; i++) {
          let temp = (exam[elm][i] / examQGrad[elm]) * 100;
          exam[elm][i] = temp
        }
      }
    // let temp = exam[elm] / examQNum[elm];
    // exam[elm] = temp;
  });

  return [competenciesMap, exam, qs, snum];
}

export default getData;