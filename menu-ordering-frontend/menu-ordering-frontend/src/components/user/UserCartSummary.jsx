import { useEffect, useState } from 'react';
import { getUserId } from '../../utils/token';
import { userService } from '../../services/user';
import MessageAlert from '../common/MessageAlert';
import { Loader2 } from 'lucide-react';

const UserCartSummary = () => {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const userId = getUserId();

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await userService.getCartSummary();
      setSummary(data);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Failed to load cart summary.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      const cartItems = await userService.getCart();
      const itemIds = cartItems.map(item => item.menuItemId); // ✅ Corrected

      await userService.placeOrder({
        userId,                     // ✅ Corrected from username
        itemIds,                    // ✅ Use menuItemId
        paymentMethod: 'online',
      });

      setMessage({ type: 'success', text: '✅ Order placed successfully!' });
      setSummary(null);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Failed to place order.' });
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-6 py-10 flex justify-center items-start">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-orange-600 text-center mb-4">🛒 Cart Summary</h2>

        {message.text && <MessageAlert type={message.type} text={message.text} />}

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-orange-500" />
          </div>
        ) : !summary ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {summary.items.map((item, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.itemName}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                  <div className="text-right font-semibold text-gray-700">₹{item.subtotal}</div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total:</span>
              <span>₹{summary.totalAmount}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {placingOrder ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Placing Order...
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCartSummary;



