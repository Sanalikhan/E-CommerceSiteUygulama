import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/AuthSlice';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
     console.log("the client ID is:",clientId);
    if (!clientId) return;
     const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
//init google
       function initGoogle() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => handleCredentialResponse(response),
        ux_mode: 'popup',
        auto_select: false,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large', width: '300' }
      );
    }
  }

  if (existingScript) {
    // script tag already present; GSI may already be loaded
    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      existingScript.addEventListener('load', initGoogle);
    }
    return;
  }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;

    document.head.appendChild(script);

    return () => { document.head.removeChild(script); };
  }, []);
  async function handleCredentialResponse(response) {
    if (!response || !response.credential) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || res.statusText || 'Google sign-in failed');
        setLoading(false);
        return;
      }

      if (!data.user || !data.token) {
        setError('Google sign-in succeeded but response is missing auth data.');
        setLoading(false);
        return;
      }

      dispatch(setUser({ user: data.user, token: data.token }));
      setLoading(false);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || data.message || response.statusText || 'Invalid credentials');
        setLoading(false);
        return;
      }

      if (!data.user || !data.token) {
        setError('Login succeeded but response is missing required auth data.');
        setLoading(false);
        return;
      }

      dispatch(setUser({ user: data.user, token: data.token }));
      setLoading(false);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
      setLoading(false);
    }
  };

  return (
    <div>
          <div className="mx-auto max-w-md px-5 py-10 text-black bg-white border border-gray-400 rounded-4xl my-10">
      <h2 className="mb-6 text-2xl font-bold">Sign In</h2>
      {error && <div className="mb-4 text-sm text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 my-10 relative">
        <div>
          <label className="block text-sm text-black my-2">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full px-3 py-2 text-black border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm text-black my-2">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full px-3 py-2 text-black border border-gray-300"
          />
        </div>
        <div>
          <button
            type="submit"
            className="rounded-full bg-[#FFA920] px-4 py-2 font-medium absolute right-1/7"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      <div className="mt-6">
        <div id="googleSignInButton" className="mt-2" />
        {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <div className="mt-2 text-sm text-gray-500">Set `VITE_GOOGLE_CLIENT_ID` in your environment to enable Google Sign-In.</div>
        )}
        <div className="mt-2 text-xs text-gray-400">Signing in with Google will collect name, email and profile picture from Google.</div>
      </div>
    </div>
    </div>
  );
}
    