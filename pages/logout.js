import Cookies from "js-cookie";
export default function Logout() {
  setTimeout(() => {
    Cookies.remove("token");
    Cookies.remove("data");
    Cookies.remove("loggedInStatus");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("_id");
    Cookies.remove("photo");
  }, 300);
  setTimeout(() => {
    window.location.href = "/login";
  }, 300);
  return <></>;
}
