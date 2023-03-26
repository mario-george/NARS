import { useState, useCallback, useMemo  } from "react";

const MassageAlert =(props) => {

  const [close, setClose] = useState(1);
  const closeMsg = useCallback(() => {
      setClose(0);
  }, []);

  let fail = (
    <div
        id="alert-border-2"
        class="flex p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
        role="alert"
    >
        <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
        <div class="ml-3 text-sm font-medium">
            {props.fail}
            <a href="#" class="font-semibold underline hover:no-underline"></a>.
        </div>
        <button
            type="button"
            onClick={closeMsg}
            class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-2"
            aria-label="Close"
            >
            <span class="sr-only">Dismiss</span>
            <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    ></path>
            </svg>
        </button>
    </div>
  );
  
  let success = (
    <div
    id="alert-border-3"
    class="flex p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
    role="alert"
    >
        <i class="fa-solid fa-circle-check"></i>
        <div class="ml-3 text-sm font-medium">
            {props.success}
            <a href="#" class="font-semibold underline hover:no-underline"></a>
        </div>
        <button
            onClick={closeMsg}
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-border-3"
            aria-label="Close"
        >
            <span class="sr-only">Dismiss</span>
            <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    ></path>
            </svg>
        </button>
    </div>
  );

  const msg = useMemo(() => {
    if (props.status == "success"  && close !== 0) {
      return success;
    }
    if (props.status == "fail" && close !== 0){
      return fail;
    }
    if (props.status == "" || close === 0) {
      return <div></div>;
    }
  }, [close])

  return msg;
}


export default MassageAlert;