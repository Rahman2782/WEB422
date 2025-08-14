import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/drugs';

export const getDrugs = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getDrugById = async (uuid) => {
  const response = await axios.get(`${API_BASE_URL}/${uuid}`);
  return response.data;
};

export const createDrug = async (newDrug) => {
  const response = await axios.post(API_BASE_URL, newDrug);
  return response.data;
};

export const updateDrug = async (uuid, updatedDrug) => {
  const response = await axios.put(`${API_BASE_URL}/${uuid}`, updatedDrug);
  return response.data;
};

export const deleteDrug = async (uuid) => {
  await axios.delete(`${API_BASE_URL}/${uuid}`);
};