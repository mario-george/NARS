const getData = (questions) => {
  const competenciesMap = {};
  const numOfStudents = questions[0].grades.length;
  const examGrades = {
    final: new Array(numOfStudents).fill(0),
    midterm: new Array(numOfStudents).fill(0),
    quiz: new Array(numOfStudents).fill(0),
  };
  const examQGrad = {
    final: 0,
    midterm: 0,
    quiz: 0,
  };
  const questionsGrades = {};

  questions.forEach((elm, i) => {
    const fm = elm.fullMarks;
    const elmType = elm.type;
    examQGrad[elmType] += fm;
    elm.grades.forEach((grade, i) => {
      examGrades[elmType][i] += grade; //(elm / fm) * 100;
    });
    const q = `${elm.type}${i}`;
    questionsGrades[q] = elm.grades;
    elm.competences.forEach((elm, i) => {
      if (!competenciesMap[elm]) {
        competenciesMap[elm] = new Set();
        competenciesMap[elm].add(q);
      } else {
        competenciesMap[elm].add(q);
      }
    });
  });

  Object.keys(competenciesMap).forEach((elm) => {
    let temp = competenciesMap[elm];
    competenciesMap[elm] = Array.from(temp);
  });

  Object.keys(examQGrad).forEach((elm) => {
    // const elmType = elm;
    if (examQGrad[elm]) {
      for (let i = 0; i < examGrades[elm].length; i++) {
        let temp = (examGrades[elm][i] / examQGrad[elm]) * 100;
        examGrades[elm][i] = temp;
      }
    }
    // let temp = exam[elm] / examQNum[elm];
    // exam[elm] = temp;
  });

  return {
    competences: competenciesMap,
    examGrades,
    questionsGrades,
    numOfStudents,
  };
};

export default getData;
