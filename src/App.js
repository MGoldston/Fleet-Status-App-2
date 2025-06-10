// Web Version: Fleet Status App using React + Tailwind CSS
import React, { useState } from 'react';

const helicopters = [
  { rego: 'VH-8Z3' }, { rego: 'VH-8Z4' }, { rego: 'VH-8Z9' },
  { rego: 'VH-DBJ' }, { rego: 'VH-DKA' }, { rego: 'VH-XU8' },
  { rego: 'VH-XU9' }, { rego: 'VH-XUV' }, { rego: 'VH-ZFD' },
  { rego: 'VH-ZFM' }, { rego: 'VH-ZGH' }, { rego: 'VH-ZGP' }, { rego: 'VH-ZGZ' },
];

const bases = [
  'Karratha', 'Port Headland', 'Mackay', 'Hay Point', 'Gladstone', 'Newcastle', 'Other'
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => console.error('Service Worker registration failed:', err));
  });
}

export default function App() {
  const [users] = useState(() => {
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
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedRego, setSelectedRego] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [log, setLog] = useState([]);

  const handleLogin = () => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) setCurrentUser(found);
    else alert('Invalid login');
  };

  const handleSubmit = () => {
    if (!selectedBase || !selectedRego || !status) {
      alert('Please complete all fields');
      return;
    }
    const newEntry = {
      base: selectedBase,
      rego: selectedRego,
      status,
      note: status === 'offline' ? note : '',
      timestamp: new Date().toLocaleString()
    };
    setLog(prev => [...prev, newEntry]);
    setSelectedRego('');
    setStatus('');
    setNote('');
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <input className="border p-2 mb-2 w-64" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="border p-2 mb-4 w-64" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Log In</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome, {currentUser.username} ({currentUser.role})</h1>

      <div className="mb-4">
        <label className="block mb-1">Select Base</label>
        <select value={selectedBase} onChange={(e) => setSelectedBase(e.target.value)} className="w-full border p-2">
          <option value="">-- Choose Base --</option>
          {bases.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Helicopter</label>
        <select value={selectedRego} onChange={(e) => setSelectedRego(e.target.value)} className="w-full border p-2">
          <option value="">-- Choose Registration --</option>
          {helicopters.map(h => <option key={h.rego} value={h.rego}>{h.rego}</option>)}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setStatus('online')} className={\`px-4 py-2 rounded text-white \${status === 'online' ? 'bg-green-700' : 'bg-green-500'}\`}>Online</button>
        <button onClick={() => setStatus('offline')} className={\`px-4 py-2 rounded text-white \${status === 'offline' ? 'bg-red-700' : 'bg-red-500'}\`}>Offline</button>
      </div>

      {status === 'offline' && (
        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Enter notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      )}

      <button onClick={handleSubmit} className="bg-blue-700 text-white px-4 py-2 rounded mb-6">Submit</button>

      <h2 className="text-xl font-bold mb-2">Submitted Statuses</h2>
      <div className="space-y-2">
        {log.map((entry, idx) => (
          <div key={idx} className="border p-3 rounded shadow-sm bg-gray-50">
            <div className="font-semibold">{entry.rego} - {entry.status.toUpperCase()}</div>
            <div className="text-sm text-gray-600">{entry.base} @ {entry.timestamp}</div>
            {entry.note && <div className="text-sm text-red-700 mt-1">Note: {entry.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
