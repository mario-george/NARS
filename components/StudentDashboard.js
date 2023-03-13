import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { header } from './header';
export default function studentDashboard() {
    const router = useRouter();
    const courseName = useSelector((s) => s.user.data.courses);
    return (
        <nav className="nav2">
            <Link className="link2 focus:text-green-400 " href="/student/profile">
                Profile
            </Link>
            {header('courses', [header(courseName,
                [
                    'course details',
                    'View course materials',
                    'Assignments'
                ])

            ])}
            <Link className="link2 focus:text-green-400 " href="/login">
                Logout
            </Link>
        </nav>
    );
}
