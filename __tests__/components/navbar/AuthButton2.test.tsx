import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { expect, vi } from "vitest";
import AuthButton2 from "../../../components/navbar/AuthButton2";

// Mock next-auth
vi.mock("next-auth", async () => {
  const actual = await vi.importActual("next-auth");
  return {
    ...actual,
    auth: async () => ({
      user: {
        id: "test-user-id",
        name: "Test User",
        email: "test@example.com",
      },
      status: "authenticated",
      member: "ADMIN",
    }),
  };
});

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

describe("AuthButton2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders signOut button when user is authenticated", async () => {
    vi.mocked(useSession).mockReturnValue({
      update: vi.fn(),
      data: {
        user: { name: "Temp User" },
        expires: new Date().toISOString(),
      },
      status: "authenticated",
    });

    render(<AuthButton2 />);

    const signOutBtn = screen.getByText("Sign Out");

    expect(signOutBtn).toBeDefined();
  });

  test("renders signIn button when user is unauthenticated", async () => {
    // Test for unauthenticated state
    vi.mocked(useSession).mockReturnValue({
      update: vi.fn(),
      data: null,
      status: "unauthenticated",
    });
    render(<AuthButton2 />);

    // const signOutBtn = screen.getByText("Sign Out");
    const signInBtn = screen.getByText("Sign In");

    // expect(signOutBtn).toBeDefined();
    expect(signInBtn).toBeDefined();
  });

  test("renders nothing when session is in loading state or when user is null", async () => {
    // Test for unauthenticated state
    vi.mocked(useSession).mockReturnValue({
      update: vi.fn(),
      data: null,
      status: "loading",
    });
    render(<AuthButton2 />);

    const signOutBtn = screen.queryByText("Sign Out");
    const signInBtn = screen.queryByText("Sign In");

    expect(signOutBtn).toBeNull();
    expect(signInBtn).toBeNull();
  });
});
