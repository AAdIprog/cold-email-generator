import { Link, Outlet, useLocation } from 'react-router-dom';
import { PenTool, LayoutDashboard, Settings, Zap } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-white fixed h-full shadow-2xl z-10 hidden md:block transition-all duration-300">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
                            <Zap className="text-white fill-current" size={24} />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            ColdMail.ai
                        </h1>
                    </div>

                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
                </div>

                <nav className="px-4 space-y-2">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive('/')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <LayoutDashboard size={20} className={isActive('/') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        to="/generate"
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive('/generate')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <PenTool size={20} className={isActive('/generate') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                        <span className="font-medium">Email Generator</span>
                    </Link>

                    <Link
                        to="/campaigns"
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive('/campaigns')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <Settings size={20} className={isActive('/campaigns') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                        <span className="font-medium">Campaigns</span>
                    </Link>
                </nav>

                {/* Sign Out button removed */}
            </aside>

            {/* Main Content */}
            <main className="ml-0 md:ml-72 flex-1 p-8 bg-slate-50 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
