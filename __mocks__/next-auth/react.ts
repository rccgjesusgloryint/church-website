// __mocks__/next-auth/react.ts
export const auth = () => ({
  data: {
    user: {
      id: "test-user-id",
      name: "Test User",
      email: "test@example.com",
    },
  },
  status: "authenticated",
});

// If you're using getSession or getServerSession
export const getSession = async () => ({
  user: { name: "Test User", email: "test@example.com" },
});
