import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import InstructorDashboard from "../../../../../components/InstructorDashboard";
import { handleFile } from "../../../../../common/uploadFile";

function directAssessment({ cookies }) {
  const finalQuestions = useRef([]);
  const midtermQuestions = useRef([]);
  const supports = useRef([]);
  const isReady = useRef([false, false, false]);

  const [isRequired, setRequired] = useState([false, false, false]);
  const [courseInstance, setCourseInstance] = useState();
  const [message, setMessage] = useState({ message: "", isSuccess: true });

  const router = useRouter();
  const { courseID } = router.query;

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const resp = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        }
      );
      const jsonData = await resp.json();
      setCourseInstance(jsonData.data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitQuestions = async () => {
    if (isReady.current[0] && isReady.current[1] && isReady.current[2]) {
      const allQuestions = finalQuestions.current.concat(
        midtermQuestions.current,
        supports.current
      );
      //check if there's any competences not achieved
      const allCompetences = [];
      allQuestions.forEach((question) => {
        question.competences.forEach((comp) => {
          if (allCompetences.indexOf(comp) == -1) {
            allCompetences.push(comp);
          }
        });
      });
      courseInstance.course.competences.forEach((competence) => {
        if (!allCompetences.includes(competence.code)) {
          setMessage({
            message: `Competence ${competence.code} must be achieved by one questions at least`,
            isSuccess: false,
          });
          setTimeout(() => {
            setMessage({
              message: "",
            });
          }, 3000);
          return;
        }
      });
      try {
        const resp = await fetch(
          `${process.env.url}api/v1/courses/created-courses/directAssesments/${courseID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookies.token,
            },
            body: JSON.stringify({
              questions: allQuestions,
            }),
          }
        );
        const jsonData = await resp.json();

        setMessage({
          message:
            jsonData.status == "success"
              ? "Uploaded successfully"
              : "Something Went wrong",
          isSuccess: jsonData.status == "success",
        });
        setTimeout(() => {
          setMessage({
            message: "",
          });
        }, 3000);
      } catch (e) {
        console.log(e);
      }
    } else {
      setRequired([
        !isReady.current[0],
        !isReady.current[1],
        !isReady.current[2],
      ]);
    }
  };

  return (
    <>
      {courseInstance && courseInstance.course && (
        <div className=" flex flex-row w-screen h-screen mt-2">
          <InstructorDashboard
            onOriginalCourseReceived={(course) => (course.current = course)}
          />
          <div className="bg-sky-50 h-screen w-screen flex flex-col justify-center items-center py-24 text-black ml-1 overflow-y-scroll">
            <label className=" text-black text-2xl mb-5">
              Upload Grades to Submit Direct Assessment
            </label>
            <UploadFileComponent
              title="Final Exam"
              competences={courseInstance.course.competences}
              onQuestionsUpdated={(questions) =>
                (finalQuestions.current = questions)
              }
              onQuestionsReady={() => (isReady.current[0] = true)}
              isRequired={isRequired[0]}
            />
            <UploadFileComponent
              title="Midterm Exam"
              competences={courseInstance.course.competences}
              onQuestionsUpdated={(questions) =>
                (midtermQuestions.current = questions)
              }
              onQuestionsReady={() => (isReady.current[1] = true)}
              isRequired={isRequired[1]}
            />
            <UploadFileComponent
              title="Supports"
              competences={courseInstance.course.competences}
              onQuestionsUpdated={(questions) => (supports.current = questions)}
              onQuestionsReady={() => (isReady.current[2] = true)}
              isRequired={isRequired[2]}
            />
            <div>
              <button
                onClick={submitQuestions}
                className=" text-blue-500 rounded border-2 border-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white mt-6"
              >
                Submit
              </button>
            </div>
            {message.message != "" && (
              <div className="w-full flex ml-40 mt-6">
                {
                  <div
                    className={
                      message.isSuccess
                        ? "bg-green-600 py-2 px-6 text-white rounded"
                        : "bg-red-600 py-2 px-6 text-white rounded"
                    }
                  >
                    {message.message}
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const UploadFileComponent = ({
  title,
  competences,
  onQuestionsUpdated,
  onQuestionsReady,
  isRequired,
}) => {
  //used to determine if the filed is uploaded or not and ready to be submitted
  const [questionsData, setQuestionsData] = useState([]);
  const inputRef = useRef();
  const checkBoxesRef = useRef([[]]);

  const handleUploadFileClick = (event) => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    try {
      handleFile(event, (data) => {
        const numOfQuestions = Object.keys(data[0]).length - 3;
        let questionsData = [];

        //fill full marks
        for (let i = 0; i < data.length; i++) {
          const item = data[i];

          if (
            "Questions Info" in item &&
            item["Questions Info"] != "Question"
          ) {
            questionsData.push({
              question: Object.values(item)[Object.keys(item).length - 2], //get Question name in Question Info Section
              fullMark: Object.values(item)[Object.keys(item).length - 1], //last value stores the full mark
              grades: [],
            });
          }
        }
        //fill grades
        for (let i = 1; i < data.length; i++) {
          const item = data[i];
          for (let j = 0; j < numOfQuestions; j++) {
            questionsData[j].grades.push(Object.values(item)[j + 1]);
          }
        }
        setQuestionsData(questionsData);
        checkBoxesRef.current = Array.from(
          { length: questionsData.length },
          () => Array.from({ length: competences.length }, () => false)
        );
        onQuestionsReady();
      });
    } catch (e) {
      console.log("Error ir " + e);
    }
  };

  const handleCheckBoxChange = (rowIndex, columnIndex, value) => {
    checkBoxesRef.current[rowIndex][columnIndex] = value;
    addCompetencesToQuestions();
  };

  const addCompetencesToQuestions = () => {
    onQuestionsUpdated(
      questionsData.map((question, index) => {
        const comps = [];
        checkBoxesRef.current[index].forEach((isChecked, index) => {
          if (isChecked) {
            comps.push(competences[index].code);
          }
        });
        question.competences = comps;
        return question;
      })
    );
  };

  useEffect(() => {
    onQuestionsUpdated(questionsData);
  }, [questionsData]);

  return (
    <div className="w-2/3 flex flex-col items-center content-center">
      <div className="w-full flex flex-col border-2 px-4 py-5 border-gray-200 m-0 mt-4  items-center content-center">
        <div className="w-full flex flex-row  rounded   items-center content-center">
          <label className="grow ">{title}</label>
          <div>
            <button
              onClick={handleUploadFileClick}
              className="text-green-700 bg-green-200 p-3 rounded"
            >
              Upload Grades
            </button>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        {questionsData.length > 0 && (
          <CompetencesTable
            competences={competences}
            questionsData={questionsData}
            handleCheckBoxChange={handleCheckBoxChange}
          />
        )}
      </div>
      {isRequired && (
        <div className="w-full flex self-stretch ml-2">
          <label className=" text-red-500">Required</label>
        </div>
      )}
    </div>
  );
};

const CompetencesTable = ({
  competences,
  questionsData,
  handleCheckBoxChange,
}) => {
  return (
    <table class="table table-striped mt-6">
      <thead>
        <tr>
          <th className="border px-4 py-2">Questions/Competences</th>
          {competences.map((e, i) => (
            <th key={i} className="border px-4 py-2">
              {e.code}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {questionsData.map((item, rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row" key={rowIndex} className="border px-4 py-2 bold">
              {item.question}
            </th>
            {Array.from({ length: competences.length }).map(
              (_, columnIndex) => (
                <td className="border px-4 py-2" key={columnIndex}>
                  <label className="w-full flex" key={columnIndex}>
                    {" "}
                    <input
                      type="checkbox"
                      key={columnIndex}
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox flex justify-center items-center"
                      onChange={(e) =>
                        handleCheckBoxChange(
                          rowIndex,
                          columnIndex,
                          e.target.checked
                        )
                      }
                    />
                  </label>
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default directAssessment;
