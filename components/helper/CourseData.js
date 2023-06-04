import Textarea from "../Textarea/Textarea";

const CourseData = ({
  hasClass,
  semester,
  code,
  special,
  hours,
  lecture,
  practice,
  courseAims,
  courseContent,
  isLectureInvalid,
  isContactHoursInvalid,
  isSpecializationInvalid,
  isSemesterYearInvalid,
  isPracticalPracticeInvalid,
  setIsPracticalPracticeInvalid,
  setIsSemesterYearInvalid,
  setIsContactHoursInvalid,
  setIsLectureInvalid,
  setIsSpecializationInvalid,
  setIsCourseAimsInvalid,
  isCourseAimsInvalid,
  setIsCourseContentInvalid,
  isCourseContentInvalid,
}) => {
  return (
    <>
      <div className="courseDataMainTitle">1-Course Data</div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className="text-[#FF0000] text-xl  font-bold">
            Course Code & Title:
          </div>
          <input
            type="text"
            name="code"
            className={`${hasClass ? "input-form" : ""} w-[60%] `}
            ref={code}
            disabled
          />
        </div>
        <div className="flex items-center gap-5  w-1/2">
          <div className="text-[#FF0000]  text-xl font-bold">
            {" "}
            Semester/Year:
          </div>
          <input
            type="text"
            name="year"
            className={`${hasClass ? "input-form" : ""} ${
              hasClass && isSemesterYearInvalid
                ? "border-red-500  bg-red-50"
                : ""
            } w-[60%]`}
            ref={semester}
            onChange={() => {
              setIsSemesterYearInvalid(false);
            }}
          />
        </div>
      </div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className={`text-[#FF0000] text-xl  font-bold `}>
            Specialization:
          </div>
          <input
            type="text"
            name="special"
            className={`${hasClass ? "input-form" : ""} ${
              hasClass && isSpecializationInvalid
                ? "border-red-500 bg-red-50"
                : ""
            } w-[60%]`}
            ref={special}
            onChange={() => {
              setIsSpecializationInvalid(false);
            }}
          />
        </div>
      </div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className="text-[#FF0000] text-xl  font-bold">
            Contact Hours:
          </div>
          <input
            type="text"
            name="hours"
            className={`${hasClass ? "input-form" : ""} ${
              hasClass && isContactHoursInvalid
                ? "border-red-500 bg-red-50"
                : ""
            } w-[60%]`}
            ref={hours}
            onChange={() => {
              setIsContactHoursInvalid(false);
            }}
          />
        </div>
        <div className="flex items-center gap-5  w-1/4">
          <div className="text-[#FF0000]  text-xl font-bold"> Lecture:</div>
          <input
            type="text"
            name="lecture"
            className={`${hasClass ? "input-form" : ""} ${
              hasClass && isLectureInvalid ? "border-red-500 bg-red-50" : ""
            } w-[60%]`}
            ref={lecture}
            onChange={() => {
              setIsLectureInvalid(false);
            }}
          />
        </div>
        <div className="flex items-center gap-5  w-1/4">
          <div className="text-[#FF0000]  text-xl font-bold">
            {" "}
            Practical/Practice:
          </div>
          <input
            type="text"
            name="practice"
            className={`${hasClass ? "input-form" : ""} ${
              hasClass && isPracticalPracticeInvalid
                ? "border-red-500 bg-red-50"
                : ""
            } w-[60%]`}
            onChange={() => {
              setIsPracticalPracticeInvalid(false);
            }}
            ref={practice}
          />
        </div>
      </div>

      <div className="flex  flex-col w-full my-0 ">
        <div className="text-2xl my-2 bg-yellow-200 ">2-Course Aims:</div>

        <Textarea
          rows="4"
          placeholder="Type here the Course Aims"
          ref={courseAims}
          v={courseAims.current?.value}
          hasClass={hasClass}
          invalid={isCourseAimsInvalid}
          resetInvalid={() => {
            setIsCourseAimsInvalid(false);
          }}
        />
      </div>
      <div className="flex flex-col  w-full">
        <div className="text-2xl my-2 bg-yellow-200">
          {" "}
          3-Course Contents(As indicated in the program):
        </div>
        <Textarea
          rows="4"
          placeholder="Type here the Course Contents"
          ref={courseContent}
          v={courseContent.current?.value}
          hasClass={hasClass}
          invalid={isCourseContentInvalid}
          resetInvalid={() => {
            setIsCourseContentInvalid(false);
          }}
        />
      </div>
    </>
  );
};
export default CourseData;
