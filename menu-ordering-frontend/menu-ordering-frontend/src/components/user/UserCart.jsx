import { useEffect, useState } from 'react';
import { userService } from '../../services/user';
import { Loader2, Plus, Minus, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../utils/token';

const UserCart = () => {
  const userId = getUserId();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const data = await userService.getCart(userId);
      setCartItems(data);
    } catch (err) {
      console.error('🛑 Error fetching cart:', err);
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (menuItemId, action) => {
    try {
      if (action === 'increase') {
        await userService.increaseItem(userId, menuItemId);
      } else {
        await userService.decreaseItem(userId, menuItemId);
      }
      fetchCart();
    } catch (err) {
      console.error('⚠️ Error updating quantity:', err);
      setError('Failed to update quantity');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Your Cart</h2>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin text-orange-500 h-6 w-6" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{item.menuItemName}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.unitPrice} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.menuItemId, 'decrease')}
                      className="bg-orange-100 p-2 rounded hover:bg-orange-200"
                    >
                      <Minus className="h-4 w-4 text-orange-600" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.menuItemId, 'increase')}
                      className="bg-orange-100 p-2 rounded hover:bg-orange-200"
                    >
                      <Plus className="h-4 w-4 text-orange-600" />
                    </button>
                    <span className="font-medium text-gray-700 ml-4">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/user/cart/summary')}
                className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition"
              >
                <Receipt className="h-5 w-5 mr-2" />
                View Cart Summary
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCart;


