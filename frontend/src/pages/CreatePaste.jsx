import { useState } from 'react';
import { Layout } from '../components/Layout';
import { createPaste } from '../services/pasteApi';
import { Link } from 'react-router-dom';

export default function CreatePaste() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const payload = { content };
      if (ttl) payload.ttl_seconds = Number(ttl);
      if (maxViews) payload.max_views = Number(maxViews);

      const data = await createPaste(payload);
      setResult(data);
      setContent('');
      setTtl('');
      setMaxViews('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">
          <textarea
            required
            className="w-full border rounded-lg p-4 font-mono min-h-52"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your text..."
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="1"
              step="1"
              placeholder="TTL (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Max views"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold"
          >
            {loading ? 'Creating...' : 'Create Paste'}
          </button>

          {error && <p className="text-red-600">{error}</p>}

          {result && (
            <div className="bg-green-50 p-4 rounded">
              <input
                readOnly
                value={result.url}
                className="w-full p-2 font-mono"
              />
              <Link
                to={`/p/${result.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                Open Paste
              </Link>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}