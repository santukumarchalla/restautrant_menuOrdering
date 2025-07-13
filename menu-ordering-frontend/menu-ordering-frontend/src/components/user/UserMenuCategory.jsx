import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../../services/user';
import { Loader2, ShoppingCart } from 'lucide-react';

const UserMenuCategory = () => {
  const { categoryId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await userService.getMenuByCategory(categoryId);
        setMenuItems(data);
      } catch (err) {
        setError('Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [categoryId]);

  const handleAddToCart = async (itemId) => {
    try {
      await userService.addToCart(itemId); // ✅ only itemId passed now
      setMessage('Item added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setError('Failed to add to cart');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-orange-600">Menu Items</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-6 w-6 text-orange-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {message && <div className="text-green-600 text-center mb-4">{message}</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-4"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-orange-600 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-md font-bold text-gray-800">₹{item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 text-sm rounded-lg"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserMenuCategory;
