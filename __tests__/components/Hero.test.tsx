import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Hero from "../../components/Hero";

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
  useSession: () => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  }),
}));

// Mock GSAP
vi.mock("@gsap/react", () => ({ useGSAP: () => {} }));
vi.mock("gsap", () => ({ from: vi.fn() }));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
  }),
}));

// Mock useNavbarAuth hook
vi.mock("../../src/hooks/useNavbarAuth", () => ({
  useNavbarAuth: vi.fn(() => ({
    admin: null,
    loaded: false,
  })),
}));

// Mock lib/queries
vi.mock("@/lib/queries", () => ({
  accessCheck: vi.fn(),
  getAuthUserDetails: vi.fn(),
  isAdmin: vi.fn(),
}));

describe("Hero", () => {
  test("renders main heading, paragraph, andbutton", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      name: /revive the church and evangelise the world/i,
    });
    const paragraph = screen.getByText(/mobile altar/i);
    const button = screen.getByText(/LEARN MORE NOW/i);

    expect(heading).toBeDefined();
    expect(paragraph).toBeDefined();
    expect(button.innerHTML).toContain("LEARN MORE NOW");
  });
});
