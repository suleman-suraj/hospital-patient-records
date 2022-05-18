import axios from "axios"
import React, {createContext,useReducer} from "react";
import userReducer from "../reducers/userReducer";

const initialState = {
    loading: true,
    user: {},
    error: null
};
export const UsersContext = createContext();

const UsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer,initialState);
    //login a User
    async function loginUser(userInfo) {
        
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post(
          "https://apricot-rattlesnake-belt.cyclic.app/user/login",
          userInfo,
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        const userLogin = (await localStorage.getItem("userInfo"))
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
            dispatch({
                type: "LOGIN_USER",
                payload: userLogin,
            });
            //  localStorage.setItem("userInfo", data.token_id);
            console.log(res.data)
        };
        //logout
  async function logout() {
    await localStorage.removeItem("userInfo");
    dispatch({
      type: "LOGOUT",
    });
  };
    //register user
    async function registerUser(newuser){
        try{
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
      const { data } = await axios.post(
        "https://apricot-rattlesnake-belt.cyclic.app/user/register",
        newuser,
        config
      );

      dispatch({
        type: "REGISTER_USER",
        payload: data,
    });
    //  localStorage.setItem("userInfo", data.token_id);
} catch (error) {
    console.log(error.message)
}};

    return (
        <UsersContext.Provider value={{loginUser, User: state.userInfo, loading: state.loading, registerUser, logout}}>
            {children}
        </UsersContext.Provider>
    );
};
export default UsersContextProvider;

 