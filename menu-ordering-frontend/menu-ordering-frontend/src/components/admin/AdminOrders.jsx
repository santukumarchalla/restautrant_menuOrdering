import { useEffect, useState } from 'react';
import { adminService } from '../../services/admin';
import MessageAlert from '../common/MessageAlert';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (currentPage = 0) => {
    setLoading(true);
    try {
      const data = await adminService.getPaginatedOrders(currentPage);
      setOrders(data.content);
      setTotalPages(data.totalPages);
      setMessage({ type: '', text: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load orders' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleApprove = async (orderId) => {
    try {
      await adminService.approveOrder(orderId);
      setMessage({ type: 'success', text: 'Order approved successfully' });
      fetchOrders(page);
    } catch {
      setMessage({ type: 'error', text: 'Failed to approve order' });
    }
  };

  const handleDeny = async (orderId) => {
    try {
      await adminService.denyOrder(orderId);
      setMessage({ type: 'success', text: 'Order denied successfully' });
      fetchOrders(page);
    } catch {
      setMessage({ type: 'error', text: 'Failed to deny order' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-orange-600 text-center">User Orders</h2>
        <MessageAlert type={message.type} text={message.text} />

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4 transition hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-700">
                <div>
                  <p className="font-semibold">User: <span className="text-gray-800">{order.userEmail}</span></p>
                  <p className="font-semibold">Status:
                    <span className={`ml-2 font-medium ${
                      order.status === 'APPROVED' ? 'text-green-600' :
                      order.status === 'REJECTED' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="font-semibold">Total Amount:
                    <span className="ml-2 text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Items:</p>
                <ul className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium text-gray-800">{item.menuItemName}</p>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        ₹{item.price?.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-2 justify-end">
                <button
                  onClick={() => handleApprove(order.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(order.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;


