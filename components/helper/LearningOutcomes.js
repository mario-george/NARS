import BloomTaxonomyInput from "@/components/pdf2/taxonomy";
const { cognitiveDomainVerbs } = require("@/components/helpers/domainArrays");
const { AffectiveDomainVerbs } = require("@/components/helpers/domainArrays");
const { PsychomotorDomainVerbs } = require("@/components/helpers/domainArrays");
const LearningOutcomes = ({
  handleAddInput,
  handleAddInput2,
  handleAddInput3,
  inputs,
  inputs2,
  inputs3,
  removeLO1,
  removeLO2,
  removeLO3,
  hasClass,
}) => {
  return (
    <div className="flex flex-col  w-full ">
      <div className="text-2xl my-2 bg-yellow-200">5-Learning Outcomes</div>
      <i> At the end of the course, the student will be able to:</i>

      <div class="flex  items-center justify-between text-lg text-gray-700 capitalize  dark:bg-gray-700 dark:text-gray-400 ">
        <div className={`table-container w-full  `}>
          <table className="table mx-auto">
            <thead>
              <tr>
                <th
                  className="border-b p-2 bg-sky-100 text-left border border-gray-300 w-full"
                  colSpan={2}
                >
                  Cognitive Domain
                </th>
                <div className="ml-48">
                  {hasClass && (
                    <button
                      onClick={handleAddInput}
                      className="text-blue-500  py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  )}
                </div>
              </tr>
            </thead>
            <tbody>
              {inputs.map((input, index) => {
                return (
                  <tr className=" border-l border-gray-300 " key={index}>
                    <td className="px-4 border-b border-r border-gray-300">
                      {input.code}
                    </td>

                    <td className="px-4 pt-1 pb-2 w-full border-r border-gray-300 border-b">
                      <div className={` ${hasClass ? `` : ``}`}>
                        <BloomTaxonomyInput
                          className={`BloomTax ${
                            hasClass ? `input-form` : ``
                          } `}
                          hasClass={hasClass}
                          ref={input.ref}
                          key={index}
                          bloomVerbs={cognitiveDomainVerbs}
                          v={input.description}
                          placeholder={`LO ${input.counter}`}
                        />
                      </div>
                    </td>
                    {hasClass && (
                      <td className="">
                        <div className="ml-24">
                          <button
                            type="button"
                            onClick={(e) => removeLO1(e, input)}
                            className="ml-auto -mx-1.5 -mb-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
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
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex  items-center justify-between text-lg text-gray-700 capitalize  dark:bg-gray-700 dark:text-gray-400 ">
        <div className="table-container w-full ">
          <table className="table mx-auto">
            <thead>
              <tr>
                <th
                  className="border-b p-2 bg-sky-100 text-left border border-gray-300  w-full"
                  colSpan={2}
                >
                  Psychomotor Domain
                </th>
                <div className="ml-48">
                  {hasClass && (
                    <button
                      onClick={handleAddInput2}
                      className="text-blue-500  py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  )}
                </div>
              </tr>
            </thead>
            <tbody>
              {inputs2.map((input, index) => {
                return (
                  <tr className=" border-l border-gray-300 " key={index}>
                    <td className="px-4 border-b border-r border-gray-300">
                      {input.code}
                    </td>

                    <td className="px-4 pt-1 pb-2 w-full border-r border-gray-300 border-b">
                      <div className="w-full">
                        <BloomTaxonomyInput
                          className="BloomTax  "
                          hasClass={hasClass}
                          ref={input.ref}
                          key={index}
                          bloomVerbs={PsychomotorDomainVerbs}
                          v={input.description}
                          placeholder={`LO ${input.counter}`}
                        />
                      </div>
                    </td>
                    {hasClass && (
                      <td className="">
                        <div className="ml-24">
                          <button
                            type="button"
                            onClick={(e) => removeLO2(e, input)}
                            className="ml-auto -mx-1.5 -mb-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
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
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex  items-center justify-between text-lg text-gray-700 capitalize  dark:bg-gray-700 dark:text-gray-400 ">
        <div className="table-container w-full ">
          <table className="table mx-auto">
            <thead>
              <tr>
                <th
                  className="border-b p-2 bg-sky-100 text-left border border-gray-300  w-full"
                  colSpan={2}
                >
                  Affective Domain
                </th>
                <div className="ml-48">
                  {hasClass && (
                    <button
                      onClick={handleAddInput3}
                      className="text-blue-500  py-2 px-4 rounded-md"
                    >
                      Add
                    </button>
                  )}
                </div>
              </tr>
            </thead>
            <tbody>
              {inputs3.map((input, index) => {
                return (
                  <tr className=" border-l border-gray-300 " key={index}>
                    <td className="px-4 border-b border-r border-gray-300">
                      {input.code}
                    </td>

                    <td className="px-4 pt-1 pb-2 w-full border-r border-gray-300 border-b">
                      <div className="w-full">
                        <BloomTaxonomyInput
                          className="BloomTax  "
                          hasClass={hasClass}
                          ref={input.ref}
                          key={index}
                          bloomVerbs={AffectiveDomainVerbs}
                          v={input.description}
                          placeholder={`LO ${input.counter}`}
                        />
                      </div>
                    </td>
                    {hasClass && (
                      <td className="">
                        <div className="ml-24">
                          <button
                            type="button"
                            onClick={(e) => removeLO3(e, input)}
                            className="ml-auto -mx-1.5 -mb-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
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
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LearningOutcomes;
