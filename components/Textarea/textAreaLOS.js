import { forwardRef, useState } from "react";

const Textarea = forwardRef((props, ref) => {
  const { placeholder, rows, small } = props;
  let { v } = props;
  const [value, setValue] = useState(v || "");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full">
      <textarea
        className={`input-form block w-full ${
          small ? `h-[3rem]` : `h-[6rem]`
        } p-2 leading-5 resize-none border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 overflow-hidden`}
        value={value}
        placeholder={placeholder}
        ref={ref}
        onChange={handleChange}
        rows={rows || 4}
      />
    </div>
  );
});

export default Textarea;
