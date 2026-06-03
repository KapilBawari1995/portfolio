import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { useState, useEffect } from 'react';

export default function PublicOnlyRoute() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return session ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
}