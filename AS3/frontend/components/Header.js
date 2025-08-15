import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <nav className="header-nav">
      <div>
        <a href="/">Home</a>
        {session && <a href="/dashboard">Dashboard</a>}
      </div>
      <div>
        {!session ? (
          <button onClick={() => signIn('ibm-app-id')}>Sign in</button>
        ) : (
          <>
            <span>Hello, {session.user.name || session.user.email}</span>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </div>
    </nav>
  );
}