import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import CustomReactToPdf from "@/pages/pdf2/pdf333";
import { updateField } from "@/components/store/userSlice";

const ListOfReferences = ({ cookies, courseID, hasClass }) => {
  const d = useDispatch();
  const websitesInputHandler = (e) => {
    const updatedInput = e.target.value;
    setWebsites(updatedInput);
  };
  const RbookInputHandler = (e) => {
    const updatedInput = e.target.value;
    setRbooks(updatedInput);
  };
  const bookInputHandler = (e) => {
    const updatedInput = e.target.value;
    setBooks(updatedInput);
  };
  const notesInputHandler = (e) => {
    const updatedInput = e.target.value;
    setNotes(updatedInput);
  };
  const userState = useSelector((s) => s.user);
  const courseSpecs = cookies.courseSpecs;
  useEffect(() => {
    const getData = async function () {
      const r = await fetch(
        `${process.env.url}api/v1/courses/created-courses/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await r.json();
      d(updateField({ field: "courseSpecs", value: data.data.courseSpecs }));

      console.log(data);
      const references = data.data.courseSpecs.references;
      if (references.courseNotes) {
        setNotes(references.courseNotes);
      }
      if (references.courseWebsites) {
        setWebsites(references.courseWebsites);
      }
      console.log(references);
      if (references.books[0]) {
        setBooks(references.books[0]);
      }
      if (references.recommendedBooks) {
        setRbooks(references.recommendedBooks);
      }
    };
    getData();
  }, []);
  if (userState.role != "instructor" || userState.loggedInStatus != "true") {
    return <div className="error">404 could not found</div>;
  }
  const token = userState.token;
  const [isRunning, setIsRunning] = useState(true);

  const refToImgBlob = useRef();
  const buttonRef = useRef(null);
  function ChildComponent({ toPdf }) {
    const handleClick = async () => {
      try {
        console.log(toPdf);
        const pdfBlob = await toPdf();
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);

        reader.onload = () => {
          const pdfBase64 = reader.result.split(",")[1];
          localStorage.setItem("pdf9", pdfBase64);
        };
        // do something with pdfBlob
      } catch (error) {
        console.error("Failed to capture PDF:", error);
      }
    };

    return (
      <>
        {" "}
        <button ref={buttonRef} onClick={handleClick} hidden>
          Capture as PDF
        </button>
      </>
    );
  }

  const [notes, setNotes] = useState();
  const [books, setBooks] = useState();
  const [Rbooks, setRbooks] = useState();
  const [websites, setWebsites] = useState();

  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const r = await fetch(
      `${process.env.url}api/v1/courses/created-courses/${courseID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          courseSpecs: {
            references: {
              courseNotes: notes,
              books: books,
              recommendedBooks: Rbooks,
              courseWebsites: websites,
            },
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const resp = await r.json();
    console.log(resp);
  };
  let content = (
    <>
      {" "}
      <div className="text-2xl my-4 bg-yellow-200">10- List of References </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="text-xl my-4 bg-[#f0e1c2] ml-4">a-Course Notes</div>
        <textarea
          rows="6"
          name="notes"
          className={`${hasClass ? `input-form bg-sky-50` : ``} w-full  ml-4`}
          defaultValue={notes}
          placeholder="Type here the Course Notes"
          onChange={notesInputHandler}
        ></textarea>
        <div className="flex flex-col gap-5  w-full">
          <div className="text-xl my-4 bg-[#f0e1c2] ml-4">b-Books</div>

          <textarea
            rows="6"
            name="books"
            className={`${hasClass ? `input-form bg-sky-50` : ``} w-full  ml-4`}
            defaultValue={books}
            onChange={bookInputHandler}
            placeholder="Type here the books"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full ">
        <div className="text-xl my-4 bg-[#f0e1c2] ml-4">
          c-Recommended Books
        </div>

        <textarea
          rows="6"
          name="Rbooks"
          className={`${hasClass ? `input-form bg-sky-50` : ``} w-full  ml-4`}
          defaultValue={Rbooks}
          placeholder="Type here the Recommended Books"
          onChange={RbookInputHandler}
        ></textarea>
        <div className="flex flex-col gap-5  w-full">
          <div className="text-xl my-4 bg-[#f0e1c2] ml-4">
            d-Course websites
          </div>

          <textarea
            rows="6"
            name="websites"
            className={`${hasClass ? `input-form bg-sky-50` : ``} w-full  ml-4`}
            defaultValue={websites}
            onChange={websitesInputHandler}
            placeholder="Type here the Course websites"
          ></textarea>
        </div>
      </div>
    </>
  );
  return { content, submitHandler };
  return (
    <>
      <div className="flex flex-row w-screen h-screen mt-2">
        <CustomReactToPdf targetRef={refToImgBlob} filename="part9.pdf">
          {({ toPdf }) => <ChildComponent toPdf={toPdf} />}
        </CustomReactToPdf>
        <form
          onSubmit={submitHandler}
          className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
        >
          <div
            className="contentAddUser2 flex flex-col gap-10"
            ref={refToImgBlob}
          >
            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-full">
                <div>-Course Notes:</div>
                <textarea
                  rows="6"
                  name="notes"
                  className="w-full input-form"
                  ref={notes}
                  placeholder="Type here the Course Notes"
                ></textarea>
              </div>
              <div className="flex flex-col gap-5  w-full">
                <div> -Books:</div>
                <textarea
                  rows="6"
                  name="books"
                  className="w-full input-form"
                  ref={books}
                  placeholder="Type here the books"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-20 ">
              <div className="flex flex-col gap-5 w-full">
                <div>-Recommended Books:</div>
                <textarea
                  rows="6"
                  name="Rbooks"
                  className="w-full input-form pl-1"
                  ref={Rbooks}
                  placeholder="Type here the Recommended Books"
                ></textarea>
              </div>
              <div className="flex flex-col gap-5  w-full">
                <div> -Course websites: </div>
                <textarea
                  rows="6"
                  name="websites"
                  className="w-full input-form pl-1"
                  ref={websites}
                  placeholder="Type here the Course websites"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end absolute bottom-[8rem] right-[7rem]">
            <button
              type="submit"
              class="w-[6rem]  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ListOfReferences;
