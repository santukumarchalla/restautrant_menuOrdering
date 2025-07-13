// src/components/user/UserOrderHistory.jsx
import { useEffect, useState } from 'react';
import { userService } from '../../services/user';
import { getUsernameFromToken } from '../../utils/token';
import MessageAlert from '../common/MessageAlert';

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await userService.getUserOrderHistory(username);
        setOrders(data);
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to load order history.' });
      }
    };
    fetchHistory();
  }, [username]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-orange-600 text-center">Order History</h2>
      <MessageAlert type={message.type} text={message.text} />
      
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No past orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">Items:</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
