import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { getPasteById } from '../services/pasteApi';

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPasteById(id)
      .then(setPaste)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <Layout>
        <p className="text-red-600">{error}</p>
        <Link to="/">Create new paste</Link>
      </Layout>
    );
  }

  if (!paste) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="mb-4 text-sm text-slate-500 flex gap-4 border-b pb-2">
          {paste.expires_at && (
            <span>Expires: {new Date(paste.expires_at).toLocaleString()}</span>
          )}
          {paste.remaining_views !== null && paste.remaining_views !== undefined && (
            <span>Remaining Views: {paste.remaining_views}</span>
          )}
        </div>
        <pre className="font-mono whitespace-pre-wrap text-slate-900">
          {paste.content}
        </pre>
      </div>
    </Layout>
  );
}