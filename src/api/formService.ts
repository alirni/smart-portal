import axios from "axios";

const API_BASE = "https://assignment.devotel.io";

// Submit form data
export const submitForm = async (data: any) => {
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
  const response = await axios.get(`${API_BASE}` + endpoint + depend);
  return response.data;
};