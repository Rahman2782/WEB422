import NextAuth from "next-auth"

const handler = NextAuth({
  providers: [
    {
      id: "ibm-app-id",
      name: "IBM App ID",
      type: "oidc",
      // The `issuer` needs to be the base URL of your App ID instance.
      // NextAuth's OIDC provider will automatically discover the .well-known endpoint.
      issuer: process.env.APP_ID_ISSUER,
      clientId: process.env.APP_ID_CLIENT_ID,
      clientSecret: process.env.APP_ID_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Persist the OAuth access_token to the token right after sign-in
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, such as an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
  // Ensure the debug mode is off for production, but useful for development
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }
