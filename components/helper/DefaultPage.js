import Navbar from "@/components/Navbar/Navbar";
import PdfFileCard from "@/components/filesView/pdfFileCard";

const DefaultPage = ({
  downloadPdf,
  cookies,
  courseID,
  instanceName,
  setBlobIsFound,
}) => {
  return (
    <div className="flex flex-row w-screen h-auto mt-2 scrollbar-none">
      <form
        onSubmit={downloadPdf}
        className="bg-sky-50 h-screen w-[80%] translate-x-[25%] flex flex-col justify-center items-center text-black ml-1 scrollbar-none relative"
      >
        <div className="topNav absolute top-14">
          <Navbar cookies={cookies} id={courseID} />
        </div>
        <div className="contentAddUser2 flex flex-col gap-10 overflow-auto scrollbar-none py-[10rem] m-10 ">
          <div className="mt-[6rem]"></div>
          <PdfFileCard
            name={instanceName}
            id={courseID}
            cookies={cookies}
            setBlobIsFound={setBlobIsFound}
            downloadPdf={downloadPdf}
          />
          <div>
            <div></div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default DefaultPage;
