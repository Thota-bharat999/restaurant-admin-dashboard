import api from "./api";

//Get top selling menu items

export const getTopSellingItems = async () => {
  const response = await api.get("/reports/top-selling");
  return response.data;
};
