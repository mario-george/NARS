import Textarea from "../Textarea/Textarea";

const ProgramCompetencesServed = ({ data }) => {
  console.log(data);
  const codeString = data.course.competences
    .map((competence) => competence.code.toUpperCase())
    .join(", ");
  function renderCompetencies(competences) {
    const groupedCompetences = {};

    competences.forEach((competence) => {
      const level = competence.code.charAt(0).toUpperCase();
      const key = level;
      const prefix = level === "A" ? "Engineering" : "Electrical Engineering";
      const header = `Level (${level}) ${prefix} Competencies`;

      if (!groupedCompetences[key]) {
        groupedCompetences[key] = {
          level,
          prefix,
          header,
          descriptions: [],
        };
      }

      groupedCompetences[key].descriptions.push(competence);
    });

    return Object.values(groupedCompetences).map((groupedCompetence) => (
      <div key={groupedCompetence.header}>
        <div className="text-xl my-4 bg-[#f0e1c2] mx-4">
          {groupedCompetence.header}
        </div>

        <i className="mx-4">
          At the end of this course, the students will be able to:
        </i>
        {groupedCompetence.descriptions.map((description) => (
          <p key={description.code}>
            <span className="font-bold">{description.code.toUpperCase()}</span>.{" "}
            {description.description}
          </p>
        ))}
      </div>
    ));
  }
  return (
    <>
      <div className="text-2xl my-2 bg-yellow-200 ">
        4-Program Competences Served by the Course ( {codeString})
      </div>
      {renderCompetencies(data.course.competences)}

      {/* <Textarea
        rows="4"
        placeholder="Type here the Course Aims"
        ref={courseAims}
        v={courseAims.current?.value}
        hasClass={hasClass}
      /> */}
    </>
  );
};
export default ProgramCompetencesServed;
