import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactForm from "../../../components/contact/contact-form";

// Mock react-icons BEFORE importing the component
vi.mock("react-icons/fa", () => ({
  FaPhoneAlt: ({ className }: { className?: string }) => (
    <span data-testid="fa-phone" className={className}>
      FaPhoneAlt Component
    </span>
  ),
}));

vi.mock("react-icons/fa6", () => ({
  FaLocationDot: ({ className }: { className?: string }) => (
    <span data-testid="fa-location" className={className}>
      FaLocationDot Component
    </span>
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

vi.mock("@/components/ui/textarea", () => ({
  Textarea: ({ className, ...props }: { className?: string }) => (
    <textarea data-testid="textarea" className={className} {...props} />
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

vi.mock("@/lib/queries", () => ({
  sendContactEmail: vi.fn(),
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

describe("Contact Form: ", () => {
  test("renders h1 and h2", () => {
    render(<ContactForm />);

    const heading1 = screen.getByRole("heading", {
      level: 1,
      name: "How To Find Us",
    });

    const heading2 = screen.getByRole("heading", {
      level: 2,
      name: "Contact Us",
    });

    expect(heading1).toBeDefined();
    expect(heading2).toBeDefined();
  });

  test("renders 2 input components in form component", () => {
    render(<ContactForm />);

    const input = screen.getAllByTestId("input");
    expect(input.length).toBe(2);
  });

  test("renders 'submit button' in form component", () => {
    render(<ContactForm />);

    const input = screen.getByTestId("button");
    expect(input).toBeDefined();
    expect(input.innerHTML).toBe("SEND US A MESSAGE");
  });

  test("renders 'textarea' in form component", () => {
    render(<ContactForm />);

    const textarea = screen.getByTestId("textarea");
    expect(textarea).toBeDefined();
  });

  test("renders 'contact form' text and icon", () => {
    const contactFormDetails = [
      {
        label: "Contact",
        icon: "fa-phone",
        text: "(+353) 89 402 2264",
      },
      {
        label: "Address",
        icon: "fa-location",
        text: "Woodstock South, Athy, Co. Kildare, Ireland",
      },
    ];

    render(<ContactForm />);

    contactFormDetails.forEach(({ text, icon }) => {
      expect(screen.getByText(text)).toBeDefined();
      expect(screen.getByTestId(icon)).toBeDefined();
    });
  });
});
