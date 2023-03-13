import { read, utils } from "xlsx";

export function handleFile(event, setData) {
  const files = event.target.files;
  const f = files[0];

  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = read(data, { type: "array" });
    const firstSheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheet];
    const sheetData = utils.sheet_to_json(worksheet);
    console.log("DATA IS " + JSON.stringify(sheetData));
    setData(sheetData);
  };
  reader.readAsArrayBuffer(f);
}
