import axios from "axios";
import React from "react";

export const axiosC = axios.create({
  baseURL: "https://internship-task-backend.vercel.app/api/",
});
