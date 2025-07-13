import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/user';
import { Loader2 } from 'lucide-react';

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await userService.getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/user/menu/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">
          Browse Categories
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-6 w-6 text-orange-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="p-4 bg-white border rounded-lg shadow hover:bg-orange-100 cursor-pointer text-center font-medium text-gray-700 hover:text-orange-600 transition"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserCategory;

