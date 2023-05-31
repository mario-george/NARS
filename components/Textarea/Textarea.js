import { forwardRef, useEffect, useState } from "react";

const Textarea = forwardRef((props, ref) => {
  const { placeholder, rows, small } = props;

  const [value, setValue] = useState(ref.current?.value);

  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  }, [ref.current,ref,value,ref.current?.value]);

  return (
    <div className="w-full ">
      <textarea
        className={`${props.hasClass ? 'input-form' : ''} block w-full ${
          small ? `h-[3rem]` : `h-[6rem]`
        } p-2 leading-5 resize-none border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 overflow-hidden`}
        value={value}
        rows={rows}
        placeholder={placeholder}
        ref={ref}
        onChange={handleChange}
      />
    </div>
  );
});
export default Textarea;
