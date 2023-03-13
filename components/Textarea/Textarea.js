import { useState } from "react";

function Textarea({placeholder,rows}) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className="w-full ">
      <textarea
        className="input-form block w-full h-[6rem] p-2 leading-5 resize-none border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value}
        rows={rows}
        placeholder={placeholder}

        onChange={handleChange}
      />
    </div>
  );
}

export default Textarea;
