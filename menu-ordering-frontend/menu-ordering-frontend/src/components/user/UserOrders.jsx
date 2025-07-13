import { useEffect, useState } from 'react';
import { userService } from '../../services/user';
import { getUserFromToken } from '../../utils/token';
import { BadgeCheck, XCircle } from 'lucide-react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const username = getUserFromToken()?.sub;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await userService.getUserOrders(username);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, [username]);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
        <div className="text-center text-gray-600 mt-10">No orders placed yet.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-orange-600 text-center">Your Orders</h2>

        {orders.map((order, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4 transition hover:shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-700">
              <div>
                <p className="font-semibold">Order ID: <span className="text-gray-800">{order.orderId}</span></p>
                <p className="font-semibold">Payment Status: 
                  <span className={`ml-2 font-medium ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-red-500'}`}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <p className="font-semibold">Total Amount: 
                  <span className="ml-2 text-gray-900">₹{order.totalAmount?.toFixed ? order.totalAmount.toFixed(2) : '0.00'}</span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Items:</p>
              <ul className="divide-y divide-gray-100">
                {order.itemsDetailed?.map((item, i) => (
                  <li key={i} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-gray-800">{item.menuItemName}</p>
                      <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      ₹{item.subtotal?.toFixed ? item.subtotal.toFixed(2) : '0.00'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;




