import { useEditPageData } from "@/hooks/useEditPageData";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import EditPage from "../../../components/admin/EditPage";
import { BlogType, EventType } from "@/lib/types";
import { User } from "@prisma/client";

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

// Mock the isAdmin function
vi.mock("@/lib/queries", () => ({
  isAdmin: vi.fn(),
}));

// Mock EditEvent component
vi.mock("../../../components/admin/components/EditEvent", () => ({
  default: () => <div data-testid="edit-event">Edit Event</div>,
}));

// Mock EditBlog component
vi.mock("../../../components/admin/components/EditBlog", () => ({
  default: () => <div data-testid="edit-blog">Edit Blog</div>,
}));

// Mock useNavbarAuth hook
vi.mock("@/hooks/useEditPageData", () => ({
  useEditPageData: vi.fn(() => ({
    allBlogs: [],
    currentUser: "",
    error: "",
    events: [],
    loading: false,
    usersBlogs: [],
  })),
}));

describe("EditPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows 'Loading' component when loading is true", () => {
    vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "MEMBER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: null,
      events: [],
      loading: true,
      usersBlogs: [],
    });

    render(
      <EditPage
        handleBlogEdit={vi.fn()}
        handleEventEdit={vi.fn()}
        refresh={false}
        setRefresh={vi.fn()}
      />
    );

    const loadingComponent = screen.getByText("Loading...");

    const errorComponent = screen.queryByText("Error:");

    expect(loadingComponent).toBeDefined();
    expect(errorComponent).toBeNull();
  });

  test("renders 'Error' component when an error is returned", () => {
    vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "MEMBER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: "Error getting users blogs!",
      events: [],
      loading: false,
      usersBlogs: [],
    });

    render(
      <EditPage
        handleBlogEdit={vi.fn()}
        handleEventEdit={vi.fn()}
        refresh={false}
        setRefresh={vi.fn()}
      />
    );

    const errorComponent = screen.getByText(
      "Error: Error getting users blogs!"
    );

    expect(errorComponent).toBeDefined();
  });

  test("renders 'EditEvent' component", () => {
    vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "MEMBER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: null,
      events: [],
      loading: false,
      usersBlogs: [],
    });

    render(
      <EditPage
        handleBlogEdit={vi.fn()}
        handleEventEdit={vi.fn()}
        refresh={false}
        setRefresh={vi.fn()}
      />
    );

    const editPage = screen.getByText("Edit Event");

    expect(editPage).toBeDefined();
  });

  test("returns true when member is ADMIN", () => {
    const mockValues = vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: null,
      events: [],
      loading: false,
      usersBlogs: [],
    });

    const mock = mockValues(true);

    const blogsToShow = mock.currentUser?.member === "ADMIN";

    expect(blogsToShow).toBe(true);
  });

  test("returns false when member is NOT an ADMIN", () => {
    const mockValues = vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "MEMBER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: null,
      events: [],
      loading: false,
      usersBlogs: [],
    });

    const mock = mockValues(true);

    const blogsToShow = mock.currentUser?.member === "ADMIN";

    expect(blogsToShow).toBe(false);
  });

  test("renders 'EditBlog' component", () => {
    vi.mocked(useEditPageData).mockReturnValue({
      allBlogs: [],
      currentUser: {
        name: "Temp",
        id: "",
        email: "",
        emailVerified: null,
        image: null,
        member: "MEMBER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      error: null,
      events: [],
      loading: false,
      usersBlogs: [],
    });

    render(
      <EditPage
        handleBlogEdit={vi.fn()}
        handleEventEdit={vi.fn()}
        refresh={false}
        setRefresh={vi.fn()}
      />
    );

    const editBlog = screen.getByText("Edit Blog");

    expect(editBlog).toBeDefined();
  });
});
