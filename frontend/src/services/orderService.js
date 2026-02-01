import api from "./api";


//Create order

export const createOrder = async (data) => {
  const response = await api.post("/orders/create", data);
  return response.data;
};


// Get orders with pagination & status filter
 
export const getOrders = async (params = {}) => {
  const response = await api.get("/orders/all", { params });
  return response.data;
};


// Get single order (with populated menu items)
 
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};


//Update order status

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};
