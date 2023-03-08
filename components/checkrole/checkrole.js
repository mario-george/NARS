export default function Checkrole(cookies) {

  if (cookies.role) {
    if (cookies.role === "system admin") {
      window.location.href = "/admin/profile";
    } else if (cookies.role === "instructor") {
      window.location.href = "/instructor/profile";
    }
    else if (resp.data.user.role === "program admin") {
      window.location.href = "/programadmin/profile";
    }
    else if (resp.data.user.role === "faculty admin") {
      window.location.href = "/facultyadmin/profile";
    } else {
      alert("not known role");
    }
  }
}