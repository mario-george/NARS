const LecturePlan = ({
  outcomes,
  addRowWeek,
  numColsLecturePlan,
  checkboxRefsLecturePlan,
  numRowsLecturePlan,
  handleCheckboxChangeLecturePlan,
  handleHoursChange,
  handleTopicChange,
  removeRowHandler,
  topicsRefs,
  HoursRefs,
  hasClass,
}) => {
  return (
    <div>
      <div className="text-2xl my-4 bg-yellow-200">6- Lecture Plan</div>
      <div className="flex justify-between items-center">
        <div>a) Topics to be Covered weekly & Matrix of LO’s</div>

        <div className="flex justify-end ">
          {hasClass && (
            <>
              <button
                onClick={addRowWeek}
                class="w-[7rem]  font-Roboto text-blue-500  py-2 px-4 rounded-md   text-xl mx-2 mb-2 "
              >
                Add
              </button>
              <button
                onClick={removeRowHandler}
                class="w-[7rem]  font-Roboto text-blue-500  py-2 px-4 rounded-md   text-xl mx-2 mb-2 "
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      <table className="table-auto w-full ">
        <thead>
          <tr className="   bg-gray-300">
            <th className=" border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 px-4 ">
              Week
            </th>
            <th className="border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 px-4">
              Topics
            </th>
            <th
              className="border-t-2 border-r-2 border-t-black border-l-black border-r-black  border-l-2 "
              style={{ width: "80px" }}
            >
              Planned <br /> Hours
            </th>
            <th
              colSpan={outcomes.length}
              className="border-t-2 border-r-2 border-t-black border-b-black border-b-2 border-l-black border-r-black  border-l-2 px-4 py-2 text-center"
            >
              Learning Outcomes
              <br />
            </th>
          </tr>

          <tr className="bg-gray-300">
            <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2  "></th>
            <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2 "></th>
            <th className=" px-4 border-r-2  border-l-black border-b-black border-b-2 border-r-black  border-l-2  "></th>
            {outcomes.map((e, i) => (
              <th
                key={i}
                className="border-r-2 border-b-black border-b-2  border-l-black border-r-black  border-l-2  px-4"
              >
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numRowsLecturePlan }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-2 border-black px-4 py-2">
                {" "}
                {[rowIndex + 1]}
              </td>
              <td className="border-2 px-4 py-2 border-black ">
                <input
                  type="text"
                  name="topic"
                  className="w-full"
                  onChange={(e) => handleTopicChange(rowIndex, e)}
                  defaultValue={topicsRefs.current[rowIndex]}
                />
              </td>
              <td className="border-2 border-black px-4 py-2 ">
                <input
                  name="hours"
                  type="number"
                  className="w-full"
                  onChange={(e) => handleHoursChange(rowIndex, e)}
                  defaultValue={HoursRefs.current[rowIndex]}
                />
              </td>
              {Array.from({ length: numColsLecturePlan }).map((_, colIndex) => (
                <td className="border-2 border-black px-4 py-2" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() =>
                        handleCheckboxChangeLecturePlan(rowIndex, colIndex)
                      }
                      checked={
                        checkboxRefsLecturePlan.current[rowIndex]?.[
                          colIndex
                        ] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-5 w-full">
        b) Additional private study/learning hours expected for students per
        week is{" "}
        <input
          type="text"
          className={`sameLineForm text-red-500 ${
            hasClass ? `bg-sky-50  ` : ``
          } `}
          placeholder={`${hasClass?`Hours`:``}`}
        />{" "}
        hours
      </div>
    </div>
  );
};
export default LecturePlan;
