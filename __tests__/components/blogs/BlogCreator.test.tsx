import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogCreator from "../../../components/blogs/BlogCreator";
import { BlogType } from "@/lib/types";
import dynamic from "next/dynamic";

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

vi.mock("@/components/ui/form", () => ({
  Form: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form">{children}</div>
  ),
  FormControl: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="form-control" className={className}>
      {children}
    </div>
  ),
  FormField: ({
    children,
    className,
    render,
    ...props
  }: {
    children?: React.ReactNode;
    className?: string;
    render?: any;
  }) => (
    <div data-testid="form-field" className={className}>
      {render ? render({ field: { value: "", onChange: vi.fn() } }) : children}
    </div>
  ),
  FormItem: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="form-item" className={className}>
      {children}
    </div>
  ),
  FormLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-label">{children}</div>
  ),
  FormMessage: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="form-message" className={className} {...props}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <button data-testid="button" className={className} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ className, ...props }: { className?: string }) => (
    <input data-testid="input" className={className} {...props} />
  ),
}));

vi.mock("react-hot-toast", () => ({
  toast: vi.fn(),
}));

vi.mock("../../../components/media/file-upload", () => ({
  default: ({ className }: { className?: string; apiEndpoint?: string }) => (
    <div data-testid="file-upload" className={className}>
      File Upload Component
    </div>
  ),
}));

// Mock react-hook-form with proper structure
vi.mock("react-hook-form", () => ({
  useForm: vi.fn(() => ({
    handleSubmit: vi.fn((onSubmit) => (e: Event) => {
      e.preventDefault();
      onSubmit({});
    }),
    control: {},
    formState: {
      errors: {},
      isSubmitting: false,
    },
    reset: vi.fn(),
    setValue: vi.fn(),
    watch: vi.fn(),
  })),
}));

// Mock next/dynamic properly
vi.mock("next/dynamic", () => ({
  default: vi.fn(() => () => <div data-testid="react-quill">React Quill</div>),
}));

vi.mock("@/lib/queries", () => ({
  postBlog: vi.fn(),
}));

describe("BlogCreator: ", () => {
  const blog = {
    blogContent: "Test content",
    blogDescription: "Test description",
    blogTitle: "Test title",
    blogImage: "test-image.jpg",
    blogAuthor: "Test author",
    category: "Test category",
    id: "test-id",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as BlogType;

  test("renders the 'Create a new blog' title in Card Component", () => {
    render(<BlogCreator userId="Temp User Id" />);

    const cardDescription = screen.getByTestId("card-description");
    expect(cardDescription).toBeDefined();
    expect(cardDescription.innerHTML).toBe("Create a new blog");
  });

  test("renders 3 input components in form component", () => {
    render(<BlogCreator userId="Temp User Id" />);

    const input = screen.getAllByTestId("input");
    expect(input.length).toBe(3);
  });

  test("renders 'submit button' in form component", () => {
    render(<BlogCreator userId="Temp User Id" />);

    const input = screen.getByTestId("button");
    expect(input).toBeDefined();
    expect(input.innerHTML).toBe("Post Blog");
  });

  test("renders 'FileUpload' component in form component", () => {
    render(<BlogCreator userId="Temp User Id" />);

    const fileUploadComponent = screen.getByTestId("file-upload");
    expect(fileUploadComponent).toBeDefined();
  });

  test("renders 'ReactQuill' component in form component", () => {
    const mockDynamic = vi.mocked(dynamic);
    render(<BlogCreator userId="Temp User Id" />);

    const reactQuillComponent = screen.getByTestId("react-quill");
    expect(reactQuillComponent).toBeDefined();

    expect(mockDynamic).toHaveBeenCalledWith(expect.any(Function), {
      ssr: false,
    });
  });

  test("renders all form labels", () => {
    render(<BlogCreator userId="Temp User Id" />);
    const formLabelNames = [
      "Blog Title",
      "Blog Description",
      "Blog Content",
      "Blog Category",
      "Poster Image",
    ];
    const formLabels = screen.getAllByTestId("form-label");

    expect(formLabels.length).toBe(5);

    formLabels.forEach((element) => {
      formLabelNames.includes(element.innerHTML);
    });
  });

  test("form has all fields rendered on page", () => {
    render(<BlogCreator userId="Temp User Id" />);
    const form = screen.getByTestId("form");
    const input = screen.getAllByTestId("input");
    const btnInput = screen.getByTestId("button");
    const fileUploadComponent = screen.getByTestId("file-upload");
    const reactQuillComponent = screen.getByTestId("react-quill");

    input.forEach((element) => {
      expect(form).toContain(element);
    });
    expect(form).toContain(btnInput);
    expect(form).toContain(fileUploadComponent);
    expect(form).toContain(reactQuillComponent);
  });
});
