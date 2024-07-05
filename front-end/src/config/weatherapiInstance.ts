import axios from "axios";

export const weatherAxios = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5",
  withCredentials: true,
});
