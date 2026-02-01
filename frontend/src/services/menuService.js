import api from "./api";


//Get all menu items with filters
 
export const getMenuItems = async (params = {}) => {
  const response = await api.get("/menu/all", { params });
  return response.data;
};


 //Search menu items

export const searchMenuItems = async (query) => {
  const response = await api.get("/menu/search", {
    params: { q: query },
  });
  return response.data;
};


// Get single menu item

export const getMenuItemById = async (id) => {
  const response = await api.get(`/menu/${id}`);
  return response.data;
};


 //Create menu item
 
export const createMenuItem = async (data) => {
  const response = await api.post("/menu/create", data);
  return response.data;
};


 //Update menu item
export const updateMenuItem = async (id, data) => {
  const response = await api.put(`/menu/${id}`, data);
  return response.data;
};


 //Delete menu item
 
export const deleteMenuItem = async (id) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};


 //Toggle availability
 
export const toggleMenuAvailability = async (id) => {
  const response = await api.patch(`/menu/${id}/availability`);
  return response.data;
};
