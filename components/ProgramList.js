import React from "react";

function ProgramList({ programs }) {
    console.log(programs);

    return (
        <div className="container mx-auto my-4">
            <table className="w-full text-left border rounded " >
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 font-bold border">Name</th>
                        <th className="px-4 py-2 font-bold border">Competences</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => {
                        return (
                            <tr key={program.id}>
                                <td className="border px-4 py-2">{program.name}</td>
                                <td className="border px-4 py-2">{program.competences.map((a) => { return (
                                    <>
                                    <dev className="block">Code:{a.code}</dev>
                                    <dev>Description:{a.description}</dev>
                                    </>
                                ) })}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default ProgramList;
