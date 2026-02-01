import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  getOrderById,
} from "../services/orderService";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getOrders({
        status: statusFilter || undefined,
        page,
        limit: 5,
      });

      setOrders(response.data);
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch {
      alert("Failed to update order status");
    }
  };

  const toggleOrderDetails = async (id) => {
    if (expandedOrder?.id === id) {
      setExpandedOrder(null);
      return;
    }

    const response = await getOrderById(id);
    setExpandedOrder({ id, data: response.data });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">📦 Orders Dashboard</h1>
        <p className="text-slate-400">
          Track and manage restaurant orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* States */}
      {loading && <p className="text-slate-400">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800 text-left">
              <th className="p-3">Order #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Table</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-slate-800"
              >
                <td className="p-3">{order.orderNumber}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.tableNumber}</td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Cancelled"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-slate-800 border border-slate-700 px-2 py-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-slate-800 rounded"
        >
          Next
        </button>
      </div>

      {/* Order Details */}
      {expandedOrder && (
        <div className="mt-8 bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Order Details
          </h3>

          {expandedOrder.data.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b border-slate-700 py-2"
            >
              <span>{item.menuItem.name}</span>
              <span>
                {item.quantity} × ₹{item.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersDashboard;
