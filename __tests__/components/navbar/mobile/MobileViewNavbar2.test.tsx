import { act, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import MobileViewNavbar2 from "../../../../components/navbar/mobile/MobileViewNavbar2";
import { useNavbarAuth } from "@/hooks/useNavbarAuth";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the isAdmin function
vi.mock("@/lib/queries", () => ({
  isAdmin: vi.fn(),
}));

// Mock navContent
vi.mock("@/lib/constants", () => ({
  navContent: [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Admin", link: "/admin" },
  ],
}));

// Mock Sheet components
vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet">{children}</div>
  ),
  SheetContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="sheet-content" className={className}>
      {children}
    </div>
  ),
  SheetDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-description">{children}</div>
  ),
  SheetTrigger: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <button data-testid="sheet-trigger" className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock useNavbarAuth hook
vi.mock("@/hooks/useNavbarAuth", () => ({
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

describe("MobileViewNavbar2", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock isAdmin to return true by default
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: null,
      loaded: false,
    });
  });

  test("renders mobile navbar trigger with correct responsive classes", async () => {
    await act(async () => {
      render(<MobileViewNavbar2 />);
    });

    const trigger = screen.getByTestId("sheet-trigger");

    // Test that it has the md:hidden class (visible on mobile and tablets, hidden on desktop)
    expect(trigger.className).toContain("md:hidden");

    // Test other classes are present
    expect(trigger.className).toContain("absolute");
    expect(trigger.className).toContain("top-9");
    expect(trigger.className).toContain("left-5");
  });

  test("renders menu icon image", async () => {
    await act(async () => {
      render(<MobileViewNavbar2 />);
    });
    const menuIcon = screen.getByAltText("menu-logo");
    expect(menuIcon).toBeDefined();
  });

  test("renders navigation links when admin is true", async () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: null,
      loaded: false,
    });

    render(<MobileViewNavbar2 />);

    // Wait for the useEffect to complete
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeDefined();
      expect(screen.getByText("About")).toBeDefined();
      expect(screen.getByText("Admin")).toBeDefined();
    });
  });

  test("hides admin link when admin is false", async () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: false,
      loaded: true,
    });
    render(<MobileViewNavbar2 />);

    // Wait for the useEffect to complete
    await waitFor(() => {
      const adminLink = screen.getByText("Admin");
      expect(adminLink.className).toContain("hidden");
    });

    // Other links should not be hidden
    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    expect(homeLink.className).not.toContain("hidden");
    expect(aboutLink.className).not.toContain("hidden");
  });

  test("shows loading state when admin is false", async () => {
    vi.mocked(useNavbarAuth).mockReturnValue({
      admin: null,
      loaded: false,
    });
    render(<MobileViewNavbar2 />);

    // Wait for the useEffect to complete
    await waitFor(() => {
      const adminLink = screen.getByText("Admin");
      expect(adminLink.className).toContain("hidden");
    });
  });

  test("mobile navbar is accessible via test id", async () => {
    await act(async () => {
      render(<MobileViewNavbar2 />);
    });

    const mobileNavbar = screen.getByTestId("sheet-trigger");
    expect(mobileNavbar).toBeDefined();
  });
});
