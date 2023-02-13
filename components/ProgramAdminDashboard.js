import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { header } from './header';
export default function ProgramAdminDashboard() {
    const router = useRouter();
    const courseName = useSelector((s) => s.user.data.courses);
    return (
        <nav className="nav2">
            <Link className="link2 focus:text-green-400 " href="/programadmin/profile">
                Profile
            </Link>
            {header('Programs', [
                <Link href="/programadmin/assignprogramcoordinator">
                    Assign program coordinator
                </Link>,
                <Link href="/programadmin/assignprogramqualitycoordinator">
                    Assign program quality coordinator
                </Link>
            ])}
            {header('Courses', [
                <Link href="/programadmin/addcourse">
                    Add Course
                </Link>,
                <Link href="/programadmin/erasecourse">
                    Erase Course
                </Link>,
                <Link href="/programadmin/assigninstrctor">
                    Assign instructor
                </Link>,
                <Link href="/programadmin/assignta">
                    Assign TA
                </Link>,
            ])}
            <Link className="link2 focus:text-green-400 " href="/login">
                Logout
            </Link>
        </nav>
    );
}
