import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, userActions } from "@/components/store/userSlice";
import { useRouter } from "next/router";
import DemoData from "@/components/DemoData/DemoData.json";
const Demo = () => {
  const dispatch = useDispatch();

  const globalState = useSelector((s) => s.user);

  const {
    name,
    loggedInStatus,
    faculty,
    email,
    courses,
    department,
    _id,
    program,
  } = DemoData;
  useEffect(() => {
    dispatch(updateField({ field: "role", value: "notLogged" }));
  }, []);
  const router = useRouter();
  let rolesArr = ["instructor", "system admin"];
  const role = useRef();
  const submitRole = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (role.current.value == 'null') {
      return;
    }
    dispatch(updateField({ field: "role", value: role.current.value }));
    const coursesStringified = JSON.stringify(courses);
    dispatch(userActions.toggleLoggedIn(true));
    dispatch(updateField({ field: "courses", value: coursesStringified }));
    dispatch(updateField({ field: "loggedInStatus", value: "true" }));
    dispatch(updateField({ field: "_id", value: _id }));
    dispatch(updateField({ field: "email", value: email }));
    dispatch(updateField({ field: "name", value: name }));
    dispatch(updateField({ field: "faculty", value: faculty }));
    dispatch(updateField({ field: "department", value: department }));
    dispatch(updateField({ field: "program", value: program }));
    router.push("/profile");
  };
  return (
    <>
      <div className="w-1/2 flex flex-col justify-center item-center mx-auto mt-[4rem]">
        <div className="bg-white p-2 rounded-3xl text-black">
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Select your role
            </h3>
            <form className="space-y-6" onSubmit={submitRole}>
              <select
                ref={role}
                id="small"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
              >
                <option selected disabled value="null">
                  Choose a role
                </option>
                {rolesArr.map((e) => {
                  return <option value={e}>{e}</option>;
                })}{" "}
              </select>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
            rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
