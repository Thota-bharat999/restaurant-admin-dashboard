import { useEffect, useState } from "react";
import {
  getMenuItems,
  searchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuAvailability,
} from "../services/menuService";
import useDebounce from "../hooks/useDebounce";

const initialForm = {
  name: "",
  category: "",
  price: "",
  imageUrl: "",
  ingredients: "",
};

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState("");

  // Modal & form
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const debouncedSearch = useDebounce(search, 300);

  /* ---------------- FETCH MENU ---------------- */
  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (debouncedSearch) {
        response = await searchMenuItems(debouncedSearch);
        setMenuItems(response.data);
      } else {
        const params = {};
        if (category) params.category = category;
        if (isAvailable !== "") params.isAvailable = isAvailable;

        response = await getMenuItems(params);
        setMenuItems(response.data);
      }
    } catch {
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [debouncedSearch, category, isAvailable]);

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = "Valid price is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ---------------- ADD / EDIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      imageUrl: formData.imageUrl,
      ingredients: formData.ingredients
        ? formData.ingredients.split(",").map((i) => i.trim())
        : [],
    };

    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, payload);
      } else {
        await createMenuItem(payload);
      }

      setShowModal(false);
      setEditingItem(null);
      setFormData(initialForm);
      fetchMenu();
    } catch {
      alert("Failed to save menu item");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    await deleteMenuItem(id);
    fetchMenu();
  };

  /* ---------------- TOGGLE AVAILABILITY (OPTIMISTIC UI) ---------------- */
  const handleToggleAvailability = async (id) => {
    const previous = [...menuItems];

    setMenuItems((items) =>
      items.map((item) =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await toggleMenuAvailability(id);
    } catch {
      setMenuItems(previous);
      alert("Failed to update availability");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">🍽️ Menu Management</h1>
          <p className="text-slate-400">Admin control for menu items</p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setFormData(initialForm);
            setShowModal(true);
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded"
        >
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded"
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-slate-800 p-5 rounded-xl">
            {/* IMAGE */}
            <div className="h-40 mb-4 rounded-lg overflow-hidden bg-slate-700">
             <img
  src={item.imageUrl}
  alt={item.name}
  onError={(e) => {
    e.currentTarget.src =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23374151'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24'>No Image</text></svg>";
  }}
  className="h-full w-full object-cover"
/>

          
            </div>

            {/* Info */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.isAvailable ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <p className="text-slate-400 text-sm">{item.category}</p>
            <p className="text-xl font-bold mt-1">₹{item.price}</p>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleToggleAvailability(item._id)}
                className="flex-1 bg-blue-600 py-2 rounded"
              >
                {item.isAvailable
                  ? "Mark Unavailable"
                  : "Mark Available"}
              </button>

              <button
                onClick={() => {
                  setEditingItem(item);
                  setFormData({
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    imageUrl: item.imageUrl || "",
                    ingredients: item.ingredients.join(", "),
                  });
                  setShowModal(true);
                }}
                className="bg-yellow-600 px-3 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? "Edit Menu Item" : "Add Menu Item"}
            </h2>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 bg-slate-900 rounded"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 bg-slate-900 rounded"
            >
              <option value="">Select Category</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 bg-slate-900 rounded"
            />

            <input
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full mb-2 px-3 py-2 bg-slate-900 rounded"
            />

            <input
              placeholder="Ingredients (comma separated)"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 bg-slate-900 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-slate-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
