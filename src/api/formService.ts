import axios from "axios";
import { FormValues } from "../types";

const API_BASE = "https://assignment.devotel.io";

// Submit form data
export const submitForm = async (data: FormValues) => {
  await axios.post(`${API_BASE}/api/insurance/forms/submit`, data);
};

// Fetch submitted applications
export const fetchSubmissions = async () => {
  const response = await axios.get(
    `${API_BASE}/api/insurance/forms/submissions`
  );
  return response.data;
};

export const fetchForms = async () => {
  const response = await axios.get(`${API_BASE}/api/insurance/forms`);
  return response.data;
};


export const fetchDynamicOptions = async (endpoint: string, depend: string) => {
  const response = await axios.get(`${API_BASE}${endpoint}`, {
    params: { country: depend },
  });
  return response.data;
};