import { useEffect, useState } from 'react';
import { adminService } from '../../services/admin';
import {
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Pencil,
  Save,
} from 'lucide-react';

const AdminMenuItems = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    imageUrl: '',
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await adminService.getCategories();
      setCategories(data);
      if (data.length > 0 && !selectedCategory) {
        setSelectedCategory(data[0].id);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchMenuItems();
    }
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    const data = await adminService.getMenuItemsByCategory(selectedCategory);
    setItems(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!form.name || !form.price || !selectedCategory) return;
    await adminService.createMenuItem({
      ...form,
      price: parseFloat(form.price),
      categoryId: selectedCategory,
    });
    setForm({
      name: '',
      description: '',
      price: '',
      available: true,
      imageUrl: '',
    });
    fetchMenuItems();
  };

  const handleDelete = async (id) => {
    await adminService.deleteMenuItem(id);
    fetchMenuItems();
  };

  const toggleAvailability = async (id, current) => {
    await adminService.toggleAvailability(id, !current);
    fetchMenuItems();
  };

  const startEdit = (item) => {
    setEditingItemId(item.id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    await adminService.updateMenuItem(id, {
      ...editForm,
      price: parseFloat(editForm.price),
      categoryId: selectedCategory,
    });
    setEditingItemId(null);
    setEditForm({});
    fetchMenuItems();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-orange-600">Manage Menu Items</h2>

      <div className="mb-6">
        <select
          className="border px-4 py-2 rounded-lg w-full focus:ring-orange-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Add Item Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-lg"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleCreate}
        className="mb-8 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Item
      </button>

      {/* Menu Items List */}
      <ul className="space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white border rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-start gap-4 w-full md:w-2/3">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              )}
              <div className="flex-1 space-y-1">
                {editingItemId === item.id ? (
                  <>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                    <input
                      name="imageUrl"
                      value={editForm.imageUrl}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-sm text-gray-800 font-medium">₹{item.price}</p>
                    <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              {editingItemId === item.id ? (
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="p-2 text-green-600 hover:text-green-700"
                >
                  <Save className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-blue-600 hover:text-blue-700"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => toggleAvailability(item.id, item.available)}
                className={`p-2 rounded-full ${
                  item.available ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'
                }`}
              >
                {item.available ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenuItems;

