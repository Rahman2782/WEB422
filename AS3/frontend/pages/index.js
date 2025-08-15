import { useSession } from 'next-auth/react';
import Header from '../components/Header';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to the Library Management System</h1>
        {session ? (
          <p>You are logged in. Go to the <a href="/dashboard">Dashboard</a> to manage books.</p>
        ) : (
          <p>Please log in to continue.</p>
        )}
      </main>
    </div>
  );
}