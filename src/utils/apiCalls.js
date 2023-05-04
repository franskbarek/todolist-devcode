import axios from "axios";

export const publicRequest = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
