import axios from "axios";
const url6 = "http://localhost:3000/user";

const url = "http://localhost:3000/user/all";
const url2 = "http://localhost:3000/user/add";
const url3 = "http://localhost:3000/user/delete";
const url4 = "http://localhost:3000/user/ban";
const url5 = "http://localhost:3000/user/update";
export const getUsers = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const login = async (user) => {
  return  await axios.post(`${url6}/login`, user).then((response) => {
    localStorage.setItem("user", JSON.stringify(response.data));
  });
};
//add USer
export const addUser = async (user) => {
    try {
      const response = await axios.post(url2, user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${url3}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export const banUser = async (id) => {
    try {
      const response = await axios.get(`${url4}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  
  export const update = async (id,user) => {
    try {
      const response = await axios.put(`${url5}/${id}`,user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };