import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "../../components/navbar/Navbar";
import { useNavbarAuth } from "../../src/hooks/useNavbarAuth";

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

// Mock ModeToggle component
vi.mock("../../src/components/toggle-mode", () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

// Mock MobileViewNavbar component
vi.mock("../../components/navbar/MobileViewNavbar", () => ({
  default: () => <div data-testid="mobile-navbar">Mock Mobile Navbar</div>,
}));

// Mock AuthButton component
vi.mock("../../components/navbar/AuthButton", () => ({
  default: () => <button data-testid="auth-button">Login</button>,
}));

// Mock navContent
vi.mock("@/lib/constants", () => ({
  navContent: [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Admin", link: "/admin" },
  ],
}));

// Mock Skeleton component
vi.mock("../../src/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className}>
      Skeleton
    </div>
  ),
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

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows skeleton when not loaded", () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: null,
      loaded: false,
    });

    render(<Navbar />);
    expect(screen.getByTestId("skeleton")).toBeDefined();
  });

  test("renders all links when admin is true", async () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: true,
      loaded: true,
    });

    render(<Navbar />);

    expect(await screen.findByText(/Home/i)).toBeDefined();
    expect(screen.getByText(/About/i)).toBeDefined();
    expect(screen.getByText(/Admin/i)).toBeDefined();
    expect(screen.getAllByTestId("auth-button")[0]).toBeDefined();
    expect(screen.getByTestId("mode-toggle")).toBeDefined();
  });

  test("hides admin link when admin is false", async () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: false,
      loaded: true,
    });

    render(<Navbar />);
    const adminLink = screen.getByText(/Admin/i);
    expect(adminLink.classList.contains("hidden")).toBe(true); // This checks if element is actually visible

    expect(screen.getByText(/Home/i)).toBeDefined();
    expect(screen.getByText(/Home/i)).toBeDefined();
    expect(screen.getByText(/About/i)).toBeDefined();
  });

  test("renders mobile view navbar", () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: true,
      loaded: true,
    });

    render(<Navbar />);

    expect(screen.getByTestId("mobile-navbar")).toBeDefined();
  });
});
