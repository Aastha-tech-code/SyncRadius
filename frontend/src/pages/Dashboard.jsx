import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CalendarDays, Compass, MapPin } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import CommunityCard from '../components/CommunityCard';
import ActivityCard from '../components/ActivityCard';
import { api, getSavedUser } from '../services/api';
export default function Dashboard(){
 const [communities,setCommunities]=useState([]),[activities,setActivities]=useState([]),[error,setError]=useState(''); const user=getSavedUser();
 useEffect(()=>{Promise.all([api('/communities/'),api('/activities/')]).then(([c,a])=>{setCommunities(c.slice(0,3));setActivities(a.slice(0,3));}).catch(e=>setError(e.message));},[]);
 return <AppLayout><section className="welcome-row"><div><span className="eyebrow">YOUR LOCAL SPACE</span><h1>Hey, {user?.full_name?.split(' ')[0] || user?.username || 'there'} <span className="wave">✦</span></h1><p>Here’s what’s happening around your community.</p></div><div className="location-chip"><MapPin size={16}/>{user?.location || 'Your neighbourhood'}</div></section>
 {error&&<div className="error-message">{error}</div>}<section className="stats-grid"><div className="stat-card"><span className="stat-icon lavender"><Users/></span><div><strong>{communities.length}</strong><span>Communities to explore</span></div></div><div className="stat-card"><span className="stat-icon peach"><CalendarDays/></span><div><strong>{activities.length}</strong><span>Upcoming activities</span></div></div><div className="stat-card"><span className="stat-icon mint"><Compass/></span><div><strong>Local</strong><span>Your connection radius</span></div></div></section>
 <section className="section-block"><div className="section-heading"><div><span className="eyebrow">MEET YOUR PEOPLE</span><h2>Communities to explore</h2></div><Link to="/communities" className="text-link">View all <ArrowRight size={16}/></Link></div><div className="cards-grid">{communities.length?communities.map(c=><CommunityCard key={c.id} community={c} onJoin={id=>api(`/communities/${id}/join`,{method:'POST'}).then(()=>api('/communities/').then(setCommunities))} onLeave={()=>{}}/>):<div className="empty-state">No communities yet. Be the first to create one! <Link to="/communities">Explore communities</Link></div>}</div></section>
 <section className="section-block"><div className="section-heading"><div><span className="eyebrow">GET OUT THERE</span><h2>Upcoming activities</h2></div><Link to="/activities" className="text-link">View all <ArrowRight size={16}/></Link></div><div className="activity-list">{activities.length?activities.map(a=><ActivityCard key={a.id} activity={a}/>):<div className="empty-state">No activities yet. Create the first one! <Link to="/activities">Explore activities</Link></div>}</div></section>
 </AppLayout>
}
