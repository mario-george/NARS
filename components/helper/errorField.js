
export const getSuccessField = (msg, onClickFunction) => {
  return (
    <div
      id="alert-border-2"
      className="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
      role="alert"
    >
      <i className="fa-solid fa-circle-check"></i>
      <div className="ml-3 text-xl font-medium">
        {msg}
        <a href="#" className="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        onClick={onClickFunction}
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
export const getErrorField = (msg, onClickFunction) => {
  return (
    <div
      id="alert-border-2"
      className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div className="ml-3  font-medium">
        {msg}
        <a href="#" className="font-semibold underline hover:no-underline"></a>.
      </div>
      <button
        type="button"
        onClick={onClickFunction}
        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
export const getErrorFieldArray = (errors, onClickFunction) => {
  const errorMessages = [];

  if (errors.invalidEmptyTopic) {
    errorMessages.push(errors.errorEmptyTopics);
  }

  if (errors.invalidPlannedHours) {
    errorMessages.push(errors.errorPlannedHours);
  }

  if (errors.invalidTopicsRefs) {
    errorMessages.push(errors.errorTopicsRefs);
  }
  if (errors.isexpectedStudyingHoursPerWeekInvalid) {
    errorMessages.push(errors.errorExpectedHours);
  }
  if (errors.invalidWebsites) {
    errorMessages.push(errors.errorWebsites);
  }
  if (errors.invalidReferenceBooks) {
    errorMessages.push(errors.errorReferenceBooks);
  }
  if (errors.invalidBooks) {
    errorMessages.push(errors.errorBooks);
  }
  if (errors.invalidNotes) {
    errorMessages.push(errors.errorNotes);
  }
  if (errorMessages.length === 0) {
    return null; // Don't render the component if there are no error messages
  }

  return (
    <div
      id="alert-border-2"
      className="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
      <div className="ml-3 font-medium">
        {errorMessages.map((errorMsg, index) => (
          <div key={index}>{errorMsg}</div>
        ))}
        <a href="#" className="font-semibold underline hover:no-underline"></a>
      </div>
      <button
        type="button"
        onClick={onClickFunction}
        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-border-2"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
