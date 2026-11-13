import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, LayoutDashboard, Users, CalendarDays, LogOut, MapPin } from 'lucide-react';
import { clearSession, getSavedUser } from '../services/api';

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const user = getSavedUser();
  const logout = () => { clearSession(); navigate('/'); };
  return <div className="app-shell">
    <header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark"><Compass size={21}/></span>SyncRadius</NavLink>
      <nav className="main-nav"><NavLink to="/dashboard">Dashboard</NavLink><NavLink to="/communities">Communities</NavLink><NavLink to="/activities">Activities</NavLink></nav>
      <div className="user-menu"><span className="avatar">{(user?.full_name || user?.username || 'U').slice(0,1).toUpperCase()}</span><span className="user-name">{user?.full_name || user?.username}</span><button className="icon-button" onClick={logout} title="Logout"><LogOut size={18}/></button></div>
    </header>
    <main className="page-wrap">{children}</main>
    <footer className="app-footer">© {new Date().getFullYear()} SyncRadius · Find your people, right around you.</footer>
  </div>;
}
