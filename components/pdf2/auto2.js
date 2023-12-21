import { useState } from "react";
import * as Loader from "react-loader-spinner";

export default function Ass  () {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Submit your form data here
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
asdasdasd    
asdasdasd    
asdasdasd    
asdasdasd    
asdasdasd    
asdasdasd    
asdasdasd    
    <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {isSubmitting && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center">
          <Loader.Triangle type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
};
