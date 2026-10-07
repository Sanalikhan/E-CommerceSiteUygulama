import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function OrdersPage() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;

      setStatus('loading');
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || data.message || 'Unable to fetch orders');
        }

        const fetchedOrders = data.orders || [];
        const numberedOrders = fetchedOrders
          .slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((order, index) => ({
            ...order,
            userOrderNumber: index + 1,
          }));

        const sortedOrders = numberedOrders
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(sortedOrders);
        setStatus('succeeded');
      } catch (err) {
        setStatus('failed');
        setError(err.message || 'Unable to fetch orders.');
      }
    };

    fetchOrders();
  }, [user, token]);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 text-slate-900">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Your Orders</h2>
      {status === 'loading' && <p className="text-sm text-slate-600">Loading orders...</p>}
      {status === 'failed' && <p className="text-sm text-red-500">{error}</p>}
      {status === 'succeeded' && orders.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-lg text-slate-700">No previous orders found.</p>
          <p className="mt-2 text-sm text-slate-500">Your completed orders will appear here once available.</p>
        </div>
      )}
      {status === 'succeeded' && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => {
            const itemCount = order.OrderItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
            const orderDate = new Date(order.createdAt);
            const formattedDate = orderDate.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const formattedTime = orderDate.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={order.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-500">Order #{order.userOrderNumber || orderIndex + 1}</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">{formattedDate} · {formattedTime}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">{order.status || 'Pending'}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{itemCount} item{itemCount === 1 ? '' : 's'}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>

                <div className="space-y-4 px-6 py-6 sm:px-8">
                  {order.OrderItems?.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {order.OrderItems.map((item) => (
                        <div key={item.id} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                          <img
                            src={item.Product?.image || '/images/image-placeholder.png'}
                            alt={item.Product?.title || 'Order item'}
                            className="h-24 w-24 rounded-3xl object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-base font-semibold text-slate-900">{item.Product?.title || 'Product'}</h3>
                            <p className="mt-2 text-sm text-slate-600">Qty: {item.quantity}</p>
                            <p className="mt-1 text-sm text-slate-600">Unit price: ${item.unitPrice?.toFixed(2) || '0.00'}</p>
                            <p className="mt-2 text-sm font-medium text-slate-900">Subtotal: ${(item.unitPrice * item.quantity)?.toFixed(2) || '0.00'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                      No items available for this order.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
