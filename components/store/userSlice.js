const { createSlice } = require("@reduxjs/toolkit");
let initialState = {
  role: "notLogged",
  info: { verifyCode: "" },
  registerCompletionPart1: false,
  registerCompletionPart2: false,
  data: { user: { name: "unnamed" } },
  loggedInStatus: false,
  navStatus: false,
  cookies: {},
  _id: "null",
  id: "null",
  name: "undefined",
  courses: "undefined",
  jwt: "undefined",
  token: "undefined",
  original_id: "undefined",
  instance_id: "",
  courseLearningOutcomes: {},
  cp2: {},
  program: "",
  courseSpecs: {},
};
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    updateVerifyCode: (state, action) => {
      state.info.verifyCode = action.payload;
    },
    registerCompletionPart1: (state, action) => {
      state.registerCompletionPart1 = true;
    },
    registerCompletionPart2: (state, action) => {
      state.registerCompletionPart2 = true;
    },
    getUserData: (state, action) => {
      state.data = action.payload;
    },
    toggleLoggedIn: (s, action) => {
      console.log(s);
      console.log(s.loggedInStatus);
      console.log(s.role);
      s.loggedInStatus = action.payload;
    },
    logOut: (s, action) => {
      s.loggedInStatus = false;
      s.courses = "null";
      s.role = "null";
      s._id = "null";
      s.email = "null";
      s.jwt = "null";
      s.token = "null";
      s.name = "null";
      s.instance_id="null";
      s.original_id="null";
      s.program="null";
    },
    toggleNav: (s) => {
      s.navStatus = !s.navStatus;
    },
    setCookies: (s, a) => {
      s.cookies = a.payload;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});
export const {
  updateField,
  updateVerifyCode,
  registerCompletionPart1,
  registerCompletionPart2,
  getUserData,
  toggleLoggedIn,
  logOut,
  toggleNav,
  setCookies,
} = userSlice.actions;

export const userActions = userSlice.actions;
export default userSlice.reducer;
