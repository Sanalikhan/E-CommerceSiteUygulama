import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initialProductForm = {
  title: '',
  image: '',
  priceMin: '',
  priceMax: '',
  featured: false,
  popular: false,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productForm, setProductForm] = useState(initialProductForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/signin');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load dashboard');
        }

        setDashboard(data);
      } catch (err) {
        setError(err.message || 'Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate, token, user]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...productForm,
        priceMin: Number(productForm.priceMin),
        priceMax: Number(productForm.priceMax),
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Unable to save product');
      }

      setProductForm(initialProductForm);
      const refreshed = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dashboardData = await refreshed.json();
      setDashboard(dashboardData);
    } catch (err) {
      setError(err.message || 'Unable to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Delete this product from the catalog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Unable to delete product');
      }

      setDashboard((current) => ({
        ...current,
        products: current.products.filter((product) => product.id !== productId),
      }));
    } catch (err) {
      setError(err.message || 'Unable to delete product');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-100 px-6 py-20 text-center text-slate-700">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">Admin panel</p>
            <h1 className="mt-2 text-3xl font-bold">Business Dashboard</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            Signed in as {user?.name || user?.email}
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {dashboard && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Revenue', value: `$${dashboard.summary.revenue.toLocaleString()}` },
                { label: 'Orders', value: dashboard.summary.totalOrders.toLocaleString() },
                { label: 'Customers', value: dashboard.summary.totalCustomers.toLocaleString() },
                { label: 'Products', value: dashboard.summary.totalProducts.toLocaleString() },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Sales overview</h2>
                  <span className="text-sm text-slate-500">Last 6 months</span>
                </div>

                <div className="flex h-52 items-end gap-3">
                  {dashboard.salesByMonth.map((entry) => {
                    const height = Math.max((entry.total / Math.max(...dashboard.salesByMonth.map((item) => item.total || 1), 1)) * 100, 10);
                    return (
                      <div key={entry.month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex h-full w-full items-end justify-center">
                          <div
                            className="w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-yellow-300"
                            style={{ height: `${height}%`, minHeight: '12px' }}
                            title={`${entry.month}: $${entry.total.toLocaleString()}`}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{entry.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold">Business snapshot</h2>
                <div className="mt-5 space-y-4 text-sm text-slate-700">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span>Average order value</span>
                    <strong>${dashboard.summary.avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span>Top category</span>
                    <strong>Industrial storage</strong>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span>Inventory status</span>
                    <strong>{dashboard.summary.totalProducts > 0 ? 'Healthy' : 'Empty'}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold">Add product</h2>
                <form onSubmit={handleSubmitProduct} className="mt-5 space-y-4">
                  <input
                    name="title"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    placeholder="Product title"
                    value={productForm.title}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="image"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    placeholder="Image URL"
                    value={productForm.image}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="priceMin"
                      type="number"
                      step="0.01"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2"
                      placeholder="Min price"
                      value={productForm.priceMin}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      name="priceMax"
                      type="number"
                      step="0.01"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2"
                      placeholder="Max price"
                      value={productForm.priceMax}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="featured" checked={productForm.featured} onChange={handleInputChange} />
                      Featured
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="popular" checked={productForm.popular} onChange={handleInputChange} />
                      Popular
                    </label>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full rounded-xl bg-amber-500 px-4 py-2.5 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70">
                    {submitting ? 'Saving...' : 'Save product'}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold">Recent orders</h2>
                <div className="mt-5 space-y-3">
                  {dashboard.recentOrders.length === 0 ? (
                    <p className="text-sm text-slate-500">No orders yet.</p>
                  ) : (
                    dashboard.recentOrders.map((order) => (
                      <div key={order.id} className="rounded-xl border border-slate-200 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">#{order.id}</p>
                            <p className="text-xs text-slate-500">{order.customer}</p>
                          </div>
                          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">{order.status}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                          <span>{order.items.length} items</span>
                          <strong className="text-slate-900">${order.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Catalog management</h2>
                <span className="text-sm text-slate-500">{dashboard.products.length} products</span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-3 py-2">Product</th>
                      <th className="px-3 py-2">Price</th>
                      <th className="px-3 py-2">Featured</th>
                      <th className="px-3 py-2">Popular</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.products.map((product) => (
                      <tr key={product.id} className="border-t border-slate-200">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.title} className="h-10 w-10 rounded object-cover" />
                            <span>{product.title}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3">${product.priceMin.toLocaleString()} - ${product.priceMax.toLocaleString()}</td>
                        <td className="px-3 py-3">{product.featured ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-3">{product.popular ? 'Yes' : 'No'}</td>
                        <td className="px-3 py-3">
                          <button type="button" onClick={() => handleDeleteProduct(product.id)} className="rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
