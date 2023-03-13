import axios from "axios";
const url = "http://localhost:3000/user";

export const login = async (user) => {
  return axios.post(`${url}/login`, user).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
  });
};