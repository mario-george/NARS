import React, { useState } from "react";
import XLSX from "xlsx";
import { read, utils } from "xlsx";

const App = () => {
  const [data, setData] = useState([]);

  const handleFile = (event) => {
    const files = event.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const sheetData = utils.sheet_to_json(worksheet);
      console.log(sheetData);
      setData(sheetData);
    };
    reader.readAsArrayBuffer(f);
  };

  return (
    <div className="container mx-auto">
      <input
        type="file"
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-lg"
        onChange={handleFile}
      />
      {data.length > 0 && (
    
        <table className="table-auto">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2">
                  {key}
                </th>
                
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
