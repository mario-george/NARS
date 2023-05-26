const MappingLOs = ({
  competences,
  numRows,
  numRows2,
  numRows3,
  arrays,
  numCols,
  checkboxRefs,
  checkboxRefs2,
  checkboxRefs3,
  handleCheckboxChange,
  handleCheckboxChange2,
  handleCheckboxChange3,
}) => {
  return (
    <>
      <div className="text-2xl my-4 bg-yellow-200">
        5-Mapping Learning Outcomes (LO's) with competences
      </div>
      <table className="table-auto mb-8">
        <thead>
          <tr className=" bg-red-400 text-2xl">
            <th className="border-2 px-4 py-2 text-left text-xl text-yellow-200 uppercase">
              LO'S/NARS
            </th>
            {competences.map((e, i) => (
              <th
                key={i}
                className="border-2 px-4 py-2 text-xl  text-yellow-200 uppercase"
              >
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="w-full bg-sky-50">
            <th
              className="border-l px-4 py-2 text-left border-r "
              colSpan={competences.length + 1}
            >
              Cognitive domain
            </th>
          </tr>
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-2 px-4 py-2 border-r text-xl">
                {" "}
                {arrays.LO[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border-2 px-4 py-2" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                      checked={
                        checkboxRefs.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
          <tr className="w-full bg-sky-50">
            <th
              className="border-l px-4 py-2 text-left border-r"
              colSpan={competences.length + 1}
            >
              Psychomotor domain
            </th>

          </tr>
          {Array.from({ length: numRows2 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-2 px-4 py-2 text-xl">
                {" "}
                {arrays.LO2[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border-2 px-4 py-2" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange2(rowIndex, colIndex)}
                      checked={
                        checkboxRefs2.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
          <tr className="w-full bg-sky-50">
            <th
              className="border-l px-4 py-2 text-left border-r"
              colSpan={competences.length + 1}
            >
              Affective domain
            </th>

          </tr>
          {Array.from({ length: numRows3 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-2 px-4 py-2 border-r text-xl">
                {" "}
                {arrays.LO3[rowIndex].code}
              </td>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <td className="border-2 px-4 py-2" key={colIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 custom-checkbox"
                      onChange={() => handleCheckboxChange3(rowIndex, colIndex)}
                      checked={
                        checkboxRefs3.current[rowIndex]?.[colIndex] === true
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default MappingLOs;
