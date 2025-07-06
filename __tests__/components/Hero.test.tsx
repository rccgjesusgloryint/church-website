import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Hero from "../../components/Hero";
import { AuthProvider } from "../../components/AuthProvider";

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
    }),
  };
});

// Mock GSAP animation (no-op)
vi.mock("@gsap/react", () => ({
  useGSAP: () => {},
}));
vi.mock("gsap", () => ({
  from: vi.fn(),
}));

// Mock Navbar and Button components
vi.mock("@/components/navbar/Navbar", () => ({
  default: () => <div data-testid="navbar">MockNavbar</div>,
}));
vi.mock("@/components/Button", () => ({
  default: () => <button data-testid="hero-button">Get Started</button>,
}));

describe("Hero", () => {
  test("renders main heading and paragraph", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      name: /revive the church and evangelise the world/i,
    });
    const paragraph = screen.getByText(/mobile altar/i);

    expect(heading).toBeDefined();
    expect(paragraph).toBeDefined();
  });
});
