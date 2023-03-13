import React from "react";

function CourseList({ courses }) {
    console.log(courses);

    return (
        <div className="container mx-auto my-4">
            <table className="w-full text-left border rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 font-bold border">Name</th>
                        <th className="px-4 py-2 font-bold border">Code</th>
                        <th className="px-4 py-2 font-bold border">Academic Year</th>
                        <th className="px-4 py-2 font-bold border">FullMark</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => {
                        return (
                            <tr key={course.email}>
                                <td className="border px-4 py-2">{course.name}</td>
                                <td className="border px-4 py-2">{course.code}</td>
                                <td className="border px-4 py-2">{course.academicYear}</td>
                                <td className="border px-4 py-2">{course.fullMark}</td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


export default CourseList;
