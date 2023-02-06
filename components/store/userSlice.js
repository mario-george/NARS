const { createSlice } = require('@reduxjs/toolkit');
let initialState = {
  role: 'notLogged',
  info: { verifyCode: '' },
  registerCompletionPart1: false,
  registerCompletionPart2: false,
  data: {user:{name: 'unnamed' } },
  loggedInStatus: false,
};
const userSlice = createSlice({
  initialState,
  name: 'user',
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
    setLoggedIn: (s) => {
      s.loggedInStatus = true;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
