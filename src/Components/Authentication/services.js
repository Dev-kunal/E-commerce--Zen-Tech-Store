import { UseAxios } from "../../Utils/UseAxios";
import {
  setupAuthHeaderForServiceCalls,
  saveDataToLocalStorage,
} from "../../Utils/UseAxios";

export const loginUser = async ({
  userDetails,
  dispatch,
  userDispatch,
  setLoading,
}) => {
  try {
    const { success, user, token, message } = await UseAxios(
      "POST",
      "/user/login",
      userDetails
    );
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
      setLoading(false);
    } else {
      setupAuthHeaderForServiceCalls(token);
      saveDataToLocalStorage(token, user);
      userDispatch({
        type: "SET_LOGIN",
        payload: { user: user, token },
      });
      setLoading(false);
      return success;
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

export const signUpUser = async ({ userDetails, dispatch }) => {
  try {
    const { success, message } = await UseAxios(
      "POST",
      "/user/signup",
      userDetails
    );
    dispatch({
      type: "SHOW_TOAST",
      payload: { message: message },
    });
    return success;
  } catch (err) {
    console.log(err);
  }
};
