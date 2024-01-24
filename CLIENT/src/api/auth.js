//import axios from "./axios";
import axios from "axios";

const Api ='http://localhost:8080'; //luego cambiar
export const registerRequest = async (user) =>
  axios.post(`${Api}/register`, user);

export const loginRequest = async (user) => axios.post(`${Api}/login`, user);
//export const loginRequest = async (user) => axios.post(`auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);