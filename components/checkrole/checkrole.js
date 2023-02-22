export default function Checkrole(cookies){

    if (cookies.role) {
        if (cookies.role === "system admin") {
          window.location.href = "/admin/profile";
        } else if (cookies.role === "instructor") {
          window.location.href = "/instructor/profile";
        } else {
          alert("not known role");
        }
      }
}