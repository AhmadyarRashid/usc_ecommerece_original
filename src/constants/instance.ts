import axios from "axios";

const BASE_URL = process.env.BASE_URL as string;

console.log("BASE_URL", BASE_URL);

export const restInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
