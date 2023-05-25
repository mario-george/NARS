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
}) => {
  return (
    <>
      <div className="courseDataMainTitle">1-Course Data</div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className="text-red-500 text-xl  font-bold">
            Course Code & Title:
          </div>
          <input
            type="text"
            name="code"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
            ref={code}
          />
        </div>
        <div className="flex items-center gap-5  w-1/2">
          <div className="text-red-500  text-xl font-bold"> Semester/Year:</div>
          <input
            type="text"
            name="year"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
            ref={semester}
          />
        </div>
      </div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className="text-red-500 text-xl  font-bold">Specialization:</div>
          <input
            type="text"
            name="special"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
            ref={special}
          />
        </div>
      </div>
      <div className="flex  ">
        <div className="flex items-center  gap-5 w-1/2">
          <div className="text-red-500 text-xl  font-bold">Contact Hours:</div>
          <input
            type="number"
            name="hours"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
            ref={hours}
          />
        </div>
        <div className="flex items-center gap-5  w-1/4">
          <div className="text-red-500  text-xl font-bold"> Lecture:</div>
          <input
            type="number"
            name="lecture"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
            ref={lecture}
          />
        </div>
        <div className="flex items-center gap-5  w-1/4">
          <div className="text-red-500  text-xl font-bold">
            {" "}
            Practical/Practice:
          </div>
          <input
            type="number"
            name="practice"
            className={`${hasClass ? "input-form" : ""} w-[60%]`}
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
        />
      </div>
    </>
  );
};
export default CourseData;
