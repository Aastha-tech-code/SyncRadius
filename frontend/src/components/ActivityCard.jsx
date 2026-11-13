import { MapPin, CalendarDays, Trash2 } from 'lucide-react';
export default function ActivityCard({ activity, canDelete, onDelete }) {
  const date = new Date(activity.date_time);
  return <article className="content-card activity-card"><div className="activity-date"><span>{date.toLocaleDateString(undefined,{month:'short'}).toUpperCase()}</span><strong>{date.toLocaleDateString(undefined,{day:'2-digit'})}</strong></div><div className="activity-info"><h3>{activity.title}</h3><p>{activity.description || 'Come along and connect with your community.'}</p><div className="card-meta"><CalendarDays size={15}/>{date.toLocaleString()} <MapPin size={15}/>{activity.location}</div></div>{canDelete && <button className="icon-button delete-button" title="Delete activity" onClick={() => onDelete(activity.id)}><Trash2 size={17}/></button>}</article>;
}
