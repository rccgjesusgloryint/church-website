import { act, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import MobileViewNavbar from "../../../../components/navbar/mobile/MobileViewNavbar";
import { isAdmin } from "@/lib/queries";

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

describe("MobileViewNavbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock isAdmin to return true by default
    vi.mocked(isAdmin).mockResolvedValue(true);
  });

  test("renders mobile navbar trigger with correct responsive classes", async () => {
    const admin = true;

    await act(async () => {
      render(<MobileViewNavbar admin={admin} />);
    });

    const trigger = screen.getByTestId("mobile-view-navbar");

    // Test that it has the sm:hidden class (visible on mobile, hidden on desktop)
    expect(trigger.className).toContain("sm:hidden");

    // Test other classes are present
    expect(trigger.className).toContain("w-[100px]");
    expect(trigger.className).toContain("h-[100px]");
  });

  test("renders menu icon image", async () => {
    await act(async () => {
      let admin = false;
      render(<MobileViewNavbar admin={admin} />);
    });
    const menuIcon = screen.getByAltText("menu");
    expect(menuIcon).toBeDefined();
    expect(menuIcon.className).toContain("w-[50px]");
    expect(menuIcon.className).toContain("h-[50px]");
  });

  test("renders navigation links when admin is true", async () => {
    vi.mocked(isAdmin).mockResolvedValue(true);
    let admin = true;
    render(<MobileViewNavbar admin={admin} />);

    // Wait for the useEffect to complete
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeDefined();
      expect(screen.getByText("About")).toBeDefined();
      expect(screen.getByText("Admin")).toBeDefined();
    });
  });

  test("hides admin link when admin is false", async () => {
    vi.mocked(isAdmin).mockResolvedValue(false);
    let admin = false;
    render(<MobileViewNavbar admin={admin} />);

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
    vi.mocked(isAdmin).mockResolvedValue(false);
    let admin = false;
    render(<MobileViewNavbar admin={admin} />);

    // Wait for the useEffect to complete
    await waitFor(() => {
      const adminLink = screen.getByText("Admin");
      expect(adminLink.className).toContain("hidden");
    });
  });

  test("mobile navbar is accessible via test id", async () => {
    let admin = false;

    await act(async () => {
      render(<MobileViewNavbar admin={admin} />);
    });

    const mobileNavbar = screen.getByTestId("mobile-view-navbar");
    expect(mobileNavbar).toBeDefined();
  });
});
