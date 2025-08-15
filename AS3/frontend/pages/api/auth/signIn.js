// pages/auth/signin.js
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <h1>Sign in</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

// This loads the providers at build/runtime
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
