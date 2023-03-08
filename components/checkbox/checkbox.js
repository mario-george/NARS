import { useState } from 'react';

const Checkbox = ({ label, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(value, !isChecked);
  };

  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};
export default Checkbox