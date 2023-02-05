const { configureStore } = require('@reduxjs/toolkit');
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
