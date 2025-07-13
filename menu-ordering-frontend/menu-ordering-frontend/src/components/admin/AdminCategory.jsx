// src/components/admin/AdminCategory.jsx
import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';
import { Trash2, Plus } from 'lucide-react';

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const data = await adminService.getCategories();
    setCategories(data);
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await adminService.createCategory({ name });
      setName('');
      await fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await adminService.deleteCategory(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Admin Category Management</h2>

        {/* Add Category */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new category name"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center justify-center hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" />
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>

        {/* List of Categories */}
        <div className="space-y-3">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center">No categories found.</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span className="text-gray-800 font-medium">{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Delete category"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;

