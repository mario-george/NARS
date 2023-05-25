const HeaderSpecs = () => {
  return (
    <div className="flex flex-col space-y-2 mt-10  items-start justify-start">
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-red-500 text-xl  font-bold">University:</div>
        <div className="text-black text-left text-xl w-1/2  font-bold">
          Benha University{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-red-500 text-xl  font-bold">Faculty:</div>
        <div className="text-black text-xl text-left w-1/2   font-bold">
          Faculty of Engineering at Shoubra{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-red-500 text-xl  font-bold">
          Department offering the program:{" "}
        </div>
        <div className="flex justify-start items-start  w-1/2 text-black text-xl text-left font-bold">
          Electrical Engineering Department{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-red-500 text-xl  font-bold">
          Department offering the course:{" "}
        </div>
        <div className="text-black text-xl text-left w-1/2  font-bold">
          Computer Engineering Program{" "}
        </div>
      </div>
    </div>
  );
};
export default HeaderSpecs;
