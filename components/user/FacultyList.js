import React from "react";

function FacultyList({ faculties }) {
    console.log(faculties);

    return (
        <div className="container mx-auto my-4">
            <table className="w-full text-left border rounded " >
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 font-bold border">Name</th>
                        <th className="px-4 py-2 font-bold border">ID</th>
                        <th className="px-4 py-2 font-bold border">Academic Years</th>
                        <th className="px-4 py-2 font-bold border">Dean ID</th>
                        <th className="px-4 py-2 font-bold border">About</th>
                        <th className="px-4 py-2 font-bold border">Competences</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.map((faculty) => {
                        return (
                            <tr key={faculty.email}>
                                <td className="border px-4 py-2">{faculty.name}</td>
                                <td className="border px-4 py-2">{faculty.id}</td>
                                <td className="border px-4 py-2">|{faculty.academicYears.map((a)=>{return(a+'|')})}</td>
                                <td className="border px-4 py-2">{faculty.dean}</td>
                                <td className="border px-4 py-2">{faculty.about}</td>
                        <td className="border px-4 py-2">{faculty.competences.map((a)=>{return('Code:'+a.code+' Description:'+a.description+'   ')})}
                        </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default FacultyList;
