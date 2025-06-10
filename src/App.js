import React, { useState } from 'react';

const helicopters = [
  { rego: 'VH-8Z3' },
  { rego: 'VH-8Z4' },
  { rego: 'VH-8Z9' },
  { rego: 'VH-DBJ' },
  { rego: 'VH-DKA' },
  { rego: 'VH-XU8' },
  { rego: 'VH-XU9' },
  { rego: 'VH-XUV' },
  { rego: 'VH-ZFD' },
  { rego: 'VH-ZFM' },
  { rego: 'VH-ZGH' },
  { rego: 'VH-ZGP' },
  { rego: 'VH-ZGZ' },
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => console.error('Service Worker registration failed:', err));
  });
}

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [
      { username: 'eng1', password: 'engpass', role: 'engineer' },
      { username: 'mgr1', password: 'mgrpass', role: 'manager' },
      { username: 'admin', password: 'adminpass', role: 'admin' }
    ];
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const handleLogin = () => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) setCurrentUser(found);
    else alert('Invalid login');
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input
          className="border p-2 mb-2 w-64"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 mb-4 w-64"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Log In
        </button>
      </div>
    );
  }
if (!currentUser && !username && !password) {
  return <div className="p-4 text-red-600">App failed to load.</div>;
}
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-700">Welcome, {currentUser.username} ({currentUser.role})</h1>
      <p className="mt-2 text-gray-600">You are now logged in.</p>
    </div>
  );
}
