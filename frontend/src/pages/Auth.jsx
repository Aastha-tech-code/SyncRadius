import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, ArrowRight } from 'lucide-react';
import { api, setSession } from '../services/api';

export default function Auth({ mode }) {
 const signup = mode === 'signup'; const navigate = useNavigate();
 const [form, setForm] = useState({full_name:'', username:'', email:'', location:'', password:''});
 const [error,setError] = useState(''); const [loading,setLoading] = useState(false);
 const change = e => setForm({...form,[e.target.name]:e.target.value});
 const submit = async e => { e.preventDefault(); setError(''); setLoading(true); try {
   if(signup) { await api('/users/register',{method:'POST',body:form}); }
   const body = new URLSearchParams({username:form.username,password:form.password});
   const session = await api('/users/login',{method:'POST',body}); setSession(session.access_token,session.user); navigate('/dashboard');
  } catch(err){setError(err.message);} finally{setLoading(false);} };
 return <div className="auth-page"><div className="auth-side"><Link to="/" className="brand brand-light"><span className="brand-mark"><Compass size={21}/></span>SyncRadius</Link><div><span className="eyebrow">YOUR PEOPLE ARE CLOSER</span><h1>{signup?'A better neighbourhood starts with you.':'Welcome back to your circle.'}</h1><p>Find local communities, discover activities, and make meaningful connections around you.</p></div><span className="auth-side-note">Connect locally. Grow together.</span></div><div className="auth-main"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to home</Link><form className="auth-form" onSubmit={submit}><span className="eyebrow">{signup?'CREATE YOUR ACCOUNT':'GOOD TO SEE YOU AGAIN'}</span><h2>{signup?'Join your local circle':'Log in to SyncRadius'}</h2><p className="form-intro">{signup?'A few details and you’re ready to explore.':'Enter your details to continue.'}</p>
 {signup && <label>Full name<input name="full_name" value={form.full_name} onChange={change} placeholder="Your name" required minLength="2"/></label>}
 <label>Username<input name="username" value={form.username} onChange={change} placeholder="e.g. aastha_21" required minLength="3" autoComplete="username"/></label>
 {signup && <><label>Email address<input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required/></label><label>Your location <span className="optional">(optional)</span><input name="location" value={form.location} onChange={change} placeholder="e.g. Mohali, Punjab"/></label></>}
 <label>Password<input type="password" name="password" value={form.password} onChange={change} placeholder="At least 8 characters" required minLength="8" autoComplete={signup?'new-password':'current-password'}/></label>
 {error && <div className="error-message">{error}</div>}<button className="button button-primary button-full" disabled={loading}>{loading?'Please wait...':signup?'Create account':'Log in'} <ArrowRight size={17}/></button><p className="switch-auth">{signup?'Already have an account?':'New to SyncRadius?'} <Link to={signup?'/login':'/signup'}>{signup?'Log in':'Create an account'}</Link></p></form></div></div>
}
