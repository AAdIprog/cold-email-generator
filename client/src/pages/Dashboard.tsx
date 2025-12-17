import { Plus, Mail, FolderOpen, Type } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
                    <p className="text-slate-500 mt-1">Welcome back. Here's your activity overview.</p>
                </div>
                <Link
                    to="/generate"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    <span className="font-semibold">New Campaign</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-4 hover:shadow-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Total Emails</h3>
                        <p className="text-4xl font-bold text-slate-800 mt-1">12</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-4 hover:shadow-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FolderOpen size={24} />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Campaigns</h3>
                        <p className="text-4xl font-bold text-slate-800 mt-1">3</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col gap-4 hover:shadow-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Type size={24} />
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Words Generated</h3>
                        <p className="text-4xl font-bold text-slate-800 mt-1">1,240</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">Ready to start outreach?</h3>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Generate high-converting cold emails tailored to your audience in seconds using our advanced AI.</p>
                    <Link
                        to="/generate"
                        className="bg-white text-blue-700 px-8 py-4 rounded-xl hover:bg-blue-50 inline-flex items-center gap-2 font-bold shadow-xl transition-all hover:scale-105"
                    >
                        <Plus size={20} />
                        Generate Email
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
