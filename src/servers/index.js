import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000/api";

const getCitizens = async () => await axios.get("/citizens");

const updateCitizenData = async (id, body) =>
  await axios.patch(`/citizens/${id}`, body);

const getCityData = async (id) => await axios.get(`/cities/${id}`);

export { getCitizens, updateCitizenData, getCityData };
