import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InstructorDashboard from "../InstructorDashboard";
import ProgramAdminDashboard from "../ProgramAdminDashboard";
import FacultyAdminDashboard from "../FacultyAdminDashboard";
import AdminDashboard from "../AdminDashBoard";
import QualityCoordinatorDashboard from "@/components/QualityCoordinatorDashboard";
import StudentDashboard from "../StudentDashoard";
import ProgramCoordinatorDashboard from "../ProgramCoordinatorDashboard";
import DepartmentAdminDashboard from "../DepartmentAdminDashboard";

import React from "react";

function SideDashboard() {
  const globalState = useSelector((s) => s.user);

  const [instructor, setInstructor] = useState(false);
  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [programAdmin, setProgramAdmin] = useState(false);
  const [facultyAdmin, setFacultyAdmin] = useState(false);
  const [qualityCoo, setQualityCoo] = useState(false);
  const [programCoo, setProgramCoo] = useState(false);
  const [departAdmin, setDepartAdmin] = useState(false);

  useEffect(() => {
    if (globalState.role === "system admin") {
      setAdmin(true);
    } else if (globalState.role === "instructor") {
      setInstructor(true);
    } else if (globalState.role === "program admin") {
      setProgramAdmin(true);
    } else if (globalState.role === "faculty admin") {
      setFacultyAdmin(true);
    } else if (globalState.role === "quality coordinator") {
      setQualityCoo(true);
    } else if (globalState.role === "student") {
      setStudent(true);
    } else if (globalState.role === "program coordinator") {
      setProgramCoo(true);
    } else if (globalState.role === "department admin") {
      setDepartAdmin(true);
    }
  }, []);

  return (
    <div>
      {admin && <AdminDashboard />}
      {facultyAdmin && <FacultyAdminDashboard />}
      {instructor && <InstructorDashboard />}
      {programAdmin && <ProgramAdminDashboard />}
      {qualityCoo && <QualityCoordinatorDashboard />}
      {student && <StudentDashboard />}
      {programCoo && <ProgramCoordinatorDashboard />}
      {departAdmin && <DepartmentAdminDashboard />}
    </div>
  );
}

export default SideDashboard;
