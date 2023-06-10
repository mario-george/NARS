import { forwardRef, useEffect, useState } from "react";

const Textarea = forwardRef((props, ref) => {
  const { placeholder, rows, small } = props;

  const [value, setValue] = useState(ref.current?.value);

  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (props.resetInvalid) {
      props.resetInvalid();
    }
  };
  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  }, [ref.current, ref, value, ref.current?.value]);
  console.log(props.invalid);
  return (
    <div className="w-full ">
      <textarea
        className={` bg-[#f0e1c2] text-black px-4 rounded-full  block w-full  p-2 leading-6 resize-none border-gray-300   shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 overflow-hidden `}
        value={value}
        rows={1}
        placeholder={placeholder}
        ref={ref}
        onChange={handleChange}
        disabled
      />
    </div>
  );
});
export default Textarea;
