import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import EditBlog from "../../../../components/admin/components/EditBlog";
import { BlogType } from "@/lib/types";

// Mock UI components
vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-description">{children}</div>
  ),
  CardContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
}));

vi.mock("@/lib/queries", () => ({
  deleteBlog: vi.fn(),
}));

vi.mock("../../../../components/admin/components/DeleteItems", () => ({
  default: ({
    className,
  }: {
    className?: string;
    item: string;
    func: any;
    id: string;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div data-testid="delete-items" className={className}>
      DeleteItems Component
    </div>
  ),
}));

vi.mock(import("react-icons/bi"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BiEdit: ({ className }: { className?: string }) => (
      <div data-testid="bi-edit" className={className}>
        BiEdit Component
      </div>
    ),
  };
});

describe("EditBlog Component: ", () => {
  const blogs = [
    {
      blogContent: "Test content",
      blogDescription: "Test description",
      blogTitle: "Test title",
      blogImage: "test-image.jpg",
      blogAuthor: "Test author",
      category: "Test category",
      id: "test-id",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as BlogType[];
  render(
    <EditBlog blogs={blogs} setRefresh={vi.fn()} handleBlogEdit={vi.fn()} />
  );

  test("renders 'Card Description' text", () => {
    const cardDescription = screen.getByTestId("card-description");
    const cardDescriptionText = cardDescription.innerHTML;

    expect(cardDescription).toBeDefined();
    expect(cardDescriptionText).toBe("Edit Blog");
  });

  test("renders all blog titles if there are blogs", () => {
    render(
      <EditBlog blogs={blogs} handleBlogEdit={vi.fn()} setRefresh={vi.fn()} />
    );

    blogs.forEach((blog) => {
      const blogTitle = screen.getByText(blog.blogTitle);
      expect(blogTitle).toBeDefined();
    });
  });

  test("renders both edit and delete icons", () => {
    render(
      <EditBlog blogs={blogs} handleBlogEdit={vi.fn()} setRefresh={vi.fn()} />
    );

    const editIcon = screen.getByTestId("bi-edit");
    const deleteIcon = screen.getByTestId("delete-items");
    expect(editIcon).toBeDefined();
    expect(deleteIcon).toBeDefined();
  });
});
