const { createSlice } = require("@reduxjs/toolkit");
let initialState = {
  role: "notLogged",
  info: { verifyCode: "" },
  registerCompletionPart1: false,
  registerCompletionPart2: false,
  data: { user: { name: "unnamed", courses: [] } },
  loggedInStatus: false,
  navStatus: false,
  cookies: {},
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
      s.loggedInStatus = action.payload;
    },
    logOut: (s, action) => {
      s.loggedInStatus = false;
    },
    toggleNav: (s) => {
      s.navStatus = !s.navStatus;
    },
    setCookies: (s, a) => {
      s.cookies = a.payload;
    },
    setCourses: (s, a) => {
      s.data.courses = a.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
