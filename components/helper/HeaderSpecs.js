import { useEffect, useState } from "react";

const HeaderSpecs =  ({ data, token }) => {
  console.log(token)
  console.log(data)
    const [facultyName, setFacultyName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.url}api/v1/faculty/${data.course.faculty}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        const responseData = await response.json();
        console.log(responseData.data.name)
        setFacultyName(responseData.data.name);
      } catch (error) {
        console.error('Error fetching faculty name:', error);
      }
    };

    fetchData();
  }, [data.course.faculty, token]);
  return (
    <div className="flex flex-col space-y-2 mt-10  items-start justify-start">
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-[#FF0000] text-xl  font-bold">University:</div>
        <div className="text-black text-left text-xl w-1/2  font-bold">
          Benha University{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-[#FF0000] text-xl  font-bold">Faculty:</div>
        <div className="text-black text-xl text-left w-1/2   font-bold">
          {facultyName}{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-[#FF0000] text-xl  font-bold">
          Department offering the program:{" "}
        </div>
        <div className="flex justify-start items-start  w-1/2 text-black text-xl text-left font-bold">
          Electrical Engineering Department{" "}
        </div>
      </div>
      <div className="text-left flex justify-between items-center w-full">
        <div className="text-[#FF0000] text-xl  font-bold">
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
