import axios from "axios";
import { FormValues } from "../types";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Submit form data
export const submitForm = async (data: FormValues) => {
  await axios.post(`${VITE_API_BASE_URL}/api/insurance/forms/submit`, data);
};

// Fetch submitted applications
export const fetchSubmissions = async () => {
  const response = await axios.get(
    `${VITE_API_BASE_URL}/api/insurance/forms/submissions`
  );
  return response.data;
};

export const fetchForms = async () => {
  const response = await axios.get(`${VITE_API_BASE_URL}/api/insurance/forms`);
  return response.data;
};


export const fetchDynamicOptions = async (endpoint: string, depend: string) => {
  const response = await axios.get(`${VITE_API_BASE_URL}${endpoint}`, {
    params: { country: depend },
  });
  return response.data;
};