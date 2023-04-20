import React from "react";
import { useRef } from "react";

const CreateSurvey = ({ courses, token, onSurveyAdded }) => {
  const courseId = useRef();
  const selectedDate = useRef("");

  async function createSurvey() {
    try {
      const resp = await fetch(`${process.env.url}api/v1/surveys/`, {
        method: "POST",
        body: JSON.stringify({
          courseInstance: courseId.current.value,
          dueTo: selectedDate.current,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const jsonData = await resp.json();
      if (jsonData.status === "success") {
        onSurveyAdded(jsonData.data);
      }
    } catch (e) {
      console.log("ERROR IS", e);
    }
  }

  return (
    <div className="flex flex-row border-2  p-6 justify-between items-center">
      <select
        ref={courseId}
        id="small"
        class="choose-form"
        className="px-4 py-4"
      >
        <option selected>Choose a course</option>
        {courses.map((courseInstance) => {
          return (
            <option value={courseInstance._id}>
              {courseInstance.course.name}
            </option>
          );
        })}
      </select>
      <div className="flex flex-row items-center">
        <label className="px-4">Due Date: </label>
        <input
          type="date"
          id="due date"
          onChange={(event) => {
            selectedDate.current = event.target.value;
          }}
        />
      </div>

      <div>
        <button
          onClick={() => {
            createSurvey();
          }}
          className=" text-blue-600 rounded border-2 border-blue-400 px-4 py-2  bg-blue-80"
        >
          Create Survey
        </button>
      </div>
    </div>
  );
};

export default CreateSurvey;
