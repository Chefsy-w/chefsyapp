import axios from "axios";

export const UserSignUp = async (data) => {
  return await axios.post(
    "https://chefsy-b.onrender.com/user/register",
    data
  );
};

export const UserLogin = async (data) => {
  return await axios.post(
    "https://chefsy-b.onrender.com/user/login",
    data
  );
};