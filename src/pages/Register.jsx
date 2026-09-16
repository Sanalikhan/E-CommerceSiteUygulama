import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/AuthSlice';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || data.message || response.statusText || 'Unable to register.');
        setLoading(false);
        return;
      }

      if (!data.user?.username || !data.token) {
        setError('Registration succeeded but response is missing required auth data.');
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate('/signin');
    } catch (err) {
      setError(err.message || 'Unable to register.');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-10 my-10 text-black bg-white border border-gray-400 rounded-4xl">
      <h2 className="mb-6 text-2xl font-bold">Register</h2>
      {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 relative my-15">
        <div>
          <label className="block text-sm text-black my-2">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full px-3 py-2 text-black border border-gray-300  "
          />
        </div>
        <div>
          <label className="block text-sm text-black my-2">Username</label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-full px-3 py-2  text-black  border border-gray-300   "
          />
        </div>
        <div>
          <label className="block text-sm text-black my-2 ">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full px-3 py-2  text-black  border border-gray-300   "
          />
        </div>
        <div>
          <label className="block text-sm text-black my-2 ">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full px-3 py-2  text-black   border border-gray-300  "
          />
        </div>
        <div className='absolute right-1/7'>
          <button
            type="submit"
            className="rounded-full bg-[#FFA920] px-4 py-2 font-medium "
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}
