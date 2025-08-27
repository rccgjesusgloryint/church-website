import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import dynamic from "next/dynamic";
import UpdateUserForm from "../../../../components/admin/forms/UpdateUserForm";

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

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select">{children}</div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-item">{children}</div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-value">{children}</div>
  ),
}));

vi.mock("react-hot-toast", () => ({
  toast: vi.fn(),
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

vi.mock("@/lib/queries", () => ({
  updateUsersRole: vi.fn(),
}));

describe("UpdateUserForm", () => {
  test("renders 'select' component in form component", () => {
    render(
      <UpdateUserForm
        user=""
        userId=""
        usersRole="MEMBER"
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const select = screen.getByTestId("select");
    expect(select).toBeDefined();
  });

  test("renders 'button' component in form component", () => {
    render(
      <UpdateUserForm
        user=""
        userId=""
        usersRole="MEMBER"
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );
    const button = screen.getByTestId("button");

    expect(button).toBeDefined();
    expect(button.innerHTML).toBe("Update!");
  });

  test("form has all fields rendered on page", () => {
    render(
      <UpdateUserForm
        user=""
        userId=""
        usersRole="MEMBER"
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );
    const form = screen.getByTestId("form");
    const select = screen.getByTestId("select");
    const button = screen.getByTestId("button");

    expect(form).toContain(select);
    expect(form).toContain(button);
  });
});
