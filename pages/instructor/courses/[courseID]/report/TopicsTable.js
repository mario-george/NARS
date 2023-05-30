import React, { useEffect, useState } from "react";

const TopicsTable = ({ lectureTopics, learningOutcomes, courseID, token }) => {
  let originalLectureTopics = [];

  const [isEditing, setIsEditing] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    mapTopics(lectureTopics);
    originalLectureTopics = lectureTopics;
  }, []);

  function mapTopics(lectureTopics) {
    const currentTopics = [];
    lectureTopics.forEach((lectureTopic) => {
      const learningOutcomes = lectureTopic.learningOutcomes
        .filter((lo) => lo != null)
        .map((lo) => lo.code);
      currentTopics.push({
        title: lectureTopic.topics[0],
        hours: lectureTopic.plannedHours,
        learningOutcomes: learningOutcomes.toString(),
        achieved: lectureTopic.achieved,
      });
    });
    console.log(learningOutcomes);

    setTopics(currentTopics);
  }

  async function handleCheckBoxChange(index, isChecked) {
    lectureTopics[index].achieved = isChecked;
    mapTopics(lectureTopics);

    try {
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            courseSpecs: {
              lecturePlan: {
                topics: lectureTopics,
              },
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const jsonData = await resp.json();
    } catch (e) {
      console.log("ERROR IS", e);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center content-between justify-between my-2">
        <h2 className="font-bold text-xl mb-2">Course Teaching/Assessment</h2>
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className=" text-white rounded border-2 border-blue-400 px-4 py-1  bg-blue-500 "
          >
            Done
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className=" text-blue-500 px-4 py-1"
          >
            Edit
          </button>
        )}
      </div>
      <div className="h-0.5 w-full bg-gray-300 mb-2" />

      {isEditing ? (
        <AllTopicsEditing
          topics={topics}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      ) : (
        <>
          <ActuallyTaughtTopicsTable
            topics={topics.filter((topic) => topic.achieved)}
          />
          <NotCoveredTopics
            topics={lectureTopics}
            courseLearningOutcomes={learningOutcomes}
          />
        </>
      )}
    </div>
  );
};

const AllTopicsEditing = ({ topics, handleCheckBoxChange }) => {
  return (
    <>
      <div className="flex flex-col">
        <table className="table table-auto mt-6">
          <thead>
            <tr className="border-2 px-4 py-2">
              <th className="border-2 py-2">Topics actually taught</th>
              <th className="border-2 py-2">Hours</th>
              <th className="border-2 py-2">Learning Outcomes</th>
              <th className="border-2 py-2">Actually Taught?</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: topics.length }).map((_, index) => (
              <tr className="border-2" key={index}>
                <td className="text-center border-2">{topics[index].title}</td>
                <td className="text-center border-2">{topics[index].hours}</td>
                <td className="text-center border-2">
                  {topics[index].learningOutcomes}
                </td>
                <th className="pt-3 items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                    defaultChecked={topics[index].achieved}
                    onChange={(element) => {
                      handleCheckBoxChange(index, element.target.checked);
                    }}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ActuallyTaughtTopicsTable = ({ topics }) => {
  return (
    <>
      {topics.length > 0 && (
        <div className="flex flex-col items-center">
          <label className="mt-6 ">Coverage of Planned Topics</label>
          <table className="table table-auto mt-2">
            <thead>
              <tr className="border-2 px-4 py-2">
                <th className="border-2 py-2">Topics actually taught</th>
                <th className="border-2 py-2">Hours</th>
                <th className="border-2 py-2">Learning Outcomes</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: topics.length }).map((_, index) => (
                <tr className="border-2" key={index}>
                  <td className="text-center border-2">
                    {topics[index].title}
                  </td>
                  <td className="text-center border-2">
                    {topics[index].hours}
                  </td>
                  <td className="text-center border-2">
                    {topics[index].learningOutcomes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const NotCoveredTopics = ({ topics, courseLearningOutcomes }) => {
  const notCoveredTopics = [];

  //responsible for mapping topics, learningOutcomes to see which competences are related to that topic
  (function computeNotCoveredTopics() {
    topics.forEach((topic) => {
      if (!topic.achieved) {
        let notCoveredTopic = {};
        let topicCoveredCompetences = [];

        topic.learningOutcomes.forEach((lo) => {
          const loCode = lo.code;
          let allLearningOutcomes = [];

          //we have the course learning outcomes in nested domain objects like (cognitive), so we add them all into one list
          courseLearningOutcomes.forEach((courseLearningOutcome) => {
            courseLearningOutcome.learningOutcomes.forEach(
              (learningOutcome) => {
                allLearningOutcomes.push(learningOutcome);
              }
            );
          });

          //we have each topic containing los (only the code), so we take that code and search for it and check its mapped competences
          const correspondingLearningOutcome = allLearningOutcomes.find(
            (lo) => lo.code === loCode
          );

          //and finally we check what competences are related to that topic
          if (correspondingLearningOutcome != null) {
            correspondingLearningOutcome.mappedCompetence.forEach((comp) => {
              if (!topicCoveredCompetences.includes(comp)) {
                topicCoveredCompetences.push(comp);
              }
            });
          }
        });

        notCoveredTopic = {
          title: topic.topics[0],
          notCoveredCompetences: topicCoveredCompetences,
        };
        notCoveredTopics.push(notCoveredTopic);
      }
    });
  })();

  return (
    <>
      {notCoveredTopics.length > 0 && (
        <div className="flex flex-col items-center">
          <label className="mt-6">Consequences of Non-Coverage of Topics</label>
          <table className="table table-auto mt-2">
            <thead>
              <tr className="border-2 px-4 py-2">
                <th className="border-2 py-2">Topics actually taught</th>
                <th className="border-2 py-2">Competences not Covered Well</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: notCoveredTopics.length }).map(
                (_, index) => (
                  <tr className="border-2" key={index}>
                    <td className="text-center border-2">
                      {notCoveredTopics[index].title}
                    </td>
                    <td className="text-center border-2">
                      {notCoveredTopics[index].notCoveredCompetences.toString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TopicsTable;
