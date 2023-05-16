import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

const Submission = ({ cookies }) => {
  const router = useRouter();
  const { surveyId, role } = router.query;

  const submissions = useRef([]);
  const [isSurveyAlreadySubmitted, setSurveyAlreadySubmitted] = useState(false);
  const [survey, setSurvey] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [losResults, setLosResults] = useState([]);
  const [message, setMessage] = useState({
    message: "",
    isSuccess: true,
  });

  useEffect(() => {
    getSurveyDetails();
  }, []);

  async function getSurveyDetails() {
    const url = `${process.env.url}api/v1/surveys/${surveyId}`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await data.json();

      setSurvey(resp.data);
      submissions.value = new Array(resp.data.questions.length).fill(-1);
      if (role === "isStudent") {
        getStudentSubmissions(resp.data._id);
      } else {
        setDataLoaded(true);
      }
      if (Date.now() > new Date(resp.data.dueTo)) {
        getCourseInstanceDetails(resp.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getStudentSubmissions(surveyId) {
    const url = `${process.env.url}api/v1/surveys/student-submissions?studentId=${cookies._id}`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await data.json();

      resp.data.forEach((submission) => {
        if (submission.survey._id === surveyId) {
          submissions.value = submission.answers;
          setSurveyAlreadySubmitted(true);
        }
      });
      setDataLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendSubmission() {
    const url = `${process.env.url}api/v1/surveys/submissions`;
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
        body: JSON.stringify({
          surveyId: survey._id,
          studentId: cookies._id,
          answers: submissions.value,
        }),
      });

      const resp = await data.json();

      if (resp.status === "success") {
        setSurveyAlreadySubmitted(true);
      }
      setMessage({
        message:
          resp.status === "success"
            ? "Submission added successfully"
            : resp.message,
        isSuccess: resp.status === "success",
      });
      setTimeout(() => {
        setMessage({
          message: "",
        });
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  let setPercentage = (e) => {
    const { name, value } = e.target;

    const index = survey.questions.indexOf(name);
    submissions.value[index] = parseInt(value);
  };

  let submitQuestions = () => {
    let isError = false;
    submissions.value.forEach((sub) => {
      if (sub === -1) {
        isError = true;
        setMessage({
          message: "Please fill all questions",
          isSuccess: false,
        });
        setTimeout(() => {
          setMessage({
            message: "",
          });
        }, 3000);
      }
    });
    if (!isError) {
      sendSubmission();
    }
  };

  async function getCourseInstanceDetails(survey) {
    const url = `${process.env.url}api/v1/courses/created-courses/${survey.courseInstance}`;
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      });

      const resp = await data.json();

      if (resp.data.report.avgLOSInDirect) {
        setLosResults(resp.data.report.avgLOSInDirect);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex flex-row w-screen h-screen mt-2">
        <div className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none">
          <div className="contentAddUser2 flex flex-col gap-10 overflow-auto">
            <>
              {dataLoaded && (
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <label className=" text-2xl mb-6">{survey.name}</label>
                    <div className="flex flex-col">
                      {losResults.map((lo) => (
                        <div className="flex flex-row">
                          <label className="mr-4">{`${lo.LO}: `}</label>
                          <label>{`Achieved by ${lo.avg} %`}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {survey.questions.map((question, index) => (
                    <div className="p-6 flex flex-col border-solid border-2 border-gray-300 rounded mt-4">
                      <div className="text-xl p-2 border-solid font-semibold">
                        {question}
                      </div>
                      <div className="h-0.5 w-full bg-gray-300 mb-2" />
                      <label className="mt-2 mb-2">
                        By how much do you think this learning outcomes has been
                        achieved?
                      </label>
                      <QuestionRadioComponent
                        setPercentage={setPercentage}
                        question={question}
                        value={submissions.value[index].toString()}
                        disabled={
                          Date.now() > new Date(survey.dueTo) ||
                          isSurveyAlreadySubmitted ||
                          role !== "isStudent"
                        }
                      />
                    </div>
                  ))}
                  <div className="flex flex-row justify-between items-center">
                    {message.message != "" ? (
                      <div className="w-full flex ml-10 mt-6">
                        {
                          <div
                            className={
                              message.isSuccess
                                ? "bg-green-500 py-2 px-6 text-white rounded"
                                : "bg-red-500 py-2 px-6 text-white rounded"
                            }
                          >
                            {message.message}
                          </div>
                        }
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {Date.now() < new Date(survey.dueTo) &&
                      !isSurveyAlreadySubmitted &&
                      role === "isStudent" && (
                        <button
                          onClick={submitQuestions}
                          className=" text-blue-500 rounded border-2 border-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-white mt-6"
                        >
                          Submit
                        </button>
                      )}
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionRadioComponent = ({
  question,
  setPercentage,
  value,
  disabled,
}) => (
  <div
    className="flex flex-col justify-start items-start"
    onChange={setPercentage.bind(this)}
  >
    <div className="flex flex-row">
      <input
        type="radio"
        value="0"
        name={`${question}`}
        defaultChecked={value === "0"}
        disabled={disabled}
      />{" "}
      <label className="ml-6">0% not achieved at all</label>
    </div>
    <div className="flex flex-row">
      <input
        type="radio"
        value="25"
        name={`${question}`}
        defaultChecked={value === "25"}
        disabled={disabled}
      />{" "}
      <label className="ml-6">{`25% achieved but not so well`}</label>
    </div>
    <div className="flex flex-row">
      <input
        type="radio"
        value="50"
        name={`${question}`}
        defaultChecked={value === "50"}
        disabled={disabled}
      />{" "}
      <label className="ml-6">50% kind of achieved</label>
    </div>
    <div className="flex flex-row">
      <input
        type="radio"
        value="75"
        name={`${question}`}
        defaultChecked={value === "75"}
        disabled={disabled}
      />{" "}
      <label className="ml-6">75% well achieved</label>
    </div>
    <div className="flex flex-row">
      <input
        type="radio"
        value="100"
        name={`${question}`}
        defaultChecked={value === "100"}
        disabled={disabled}
      />{" "}
      <label className="ml-6">100% perfectly achieved</label>
    </div>
  </div>
);

export default Submission;
