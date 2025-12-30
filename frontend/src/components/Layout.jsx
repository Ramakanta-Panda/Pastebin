import { Link } from 'react-router-dom';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
          >
            Pastebin Lite
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            + New Paste
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {children}
      </main>
    </div>
  );
}
