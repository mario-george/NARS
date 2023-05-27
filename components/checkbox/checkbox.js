import { useState } from 'react';

const Checkbox = ({ label, value, onChange ,index,checkboxRefs}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(value, !isChecked,index);
  };

  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        //checked={checkboxRefs.current[index] === true}
        onChange={handleCheckboxChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};
export default Checkbox