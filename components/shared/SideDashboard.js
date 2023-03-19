import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Image from "next/image";
import InstructorDashboard from "../InstructorDashboard";
import ProgramAdminDashboard from "../ProgramAdminDashboard";
import FacultyAdminDashboard from "../FacultyAdminDashboard";
import AdminDashboard from "../AdminDashBoard";

import React from "react";

function SideDashboard() {
  const globalState = useSelector((s) => s.user);

  const [instructor, setInstructor] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [programAdmin, setProgramAdmin] = useState(false);
  const [facultyAdmin, setFacultyAdmin] = useState(false);

  useEffect(() => {
    if (globalState.role === "system admin") {
      setAdmin(true);
    } else if (globalState.role === "instructor") {
      setInstructor(true);
    } else if (globalState.role === "program admin") {
      setProgramAdmin(true);
    } else if (globalState.role === "faculty admin") {
      setFacultyAdmin(true);
    }
  }, []);

  return (
    <div>
      {admin && <AdminDashboard />}
      {facultyAdmin && <FacultyAdminDashboard />}
      {instructor && <ProgramAdminDashboard />}
      {programAdmin && <ProgramAdminDashboard />}
    </div>
  );
}

export default SideDashboard;
