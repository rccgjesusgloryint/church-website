import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogType, EventsType } from "@/lib/types";
import dynamic from "next/dynamic";
import UpdateEventForm from "../../../../components/admin/forms/UpdateEventForm";

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

vi.mock("@/components/ui/textarea", () => ({
  Textarea: ({ className, ...props }: { className?: string }) => (
    <textarea data-testid="textarea" className={className} {...props} />
  ),
}));

vi.mock("../../../../components/media/file-upload", () => ({
  default: ({ className }: { className?: string; apiEndpoint?: string }) => (
    <div data-testid="file-upload" className={className}>
      File Upload Component
    </div>
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

// Mock next/dynamic properly
vi.mock("next/dynamic", () => ({
  default: vi.fn(() => () => (
    <div data-testid="react-quill">Dynamic Component</div>
  )),
}));

vi.mock("@/lib/queries", () => ({
  updateEvent: vi.fn(),
}));

describe("UpdateEventForm: ", () => {
  const oldEvent = {
    id: 1,
    event: "Test Event",
    date: ["Test Date 1", "Test Date 2"],
    location: "Test Location",
    description: {
      eventDescription:
        "Test DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest DescriptionTest Description",
      eventPosterImage: "Test Image.png",
    },
    monthly: false,
  } as EventsType;

  test("renders the 'Card Description' label", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const cardDescription = screen.getByTestId("card-description");
    expect(cardDescription).toBeDefined();
    expect(cardDescription.innerHTML).toBe("Update Event");
  });

  test("renders 4 input components in form component", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const input = screen.getAllByTestId("input");
    expect(input.length).toBe(4);
  });

  test("renders 'submit button' in form component", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const input = screen.getByTestId("button");
    expect(input).toBeDefined();
    expect(input.innerHTML).toBe("Update Event");
  });

  test("renders 'FileUpload' component in form component", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const fileUploadComponent = screen.getByTestId("file-upload");
    expect(fileUploadComponent).toBeDefined();
  });

  test("renders 'textarea' component in form component", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );

    const textArea = screen.getByTestId("textarea");
    expect(textArea).toBeDefined();
  });

  test("renders all form labels", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );
    const formLabelNames = [
      "Event Name",
      "From Date",
      "To Date",
      "Address",
      "Event Poster Image",
      "Event Description",
    ];
    const formLabels = screen.getAllByTestId("form-label");

    expect(formLabels.length).toBe(6);

    formLabels.forEach((element) => {
      formLabelNames.includes(element.innerHTML);
    });
  });

  test("form has all fields rendered on page", () => {
    render(
      <UpdateEventForm
        oldEvent={oldEvent}
        setRefresh={vi.fn()}
        setClose={vi.fn()}
      />
    );
    const form = screen.getByTestId("form");
    const input = screen.getAllByTestId("input");
    const btnInput = screen.getByTestId("button");
    const textArea = screen.getByTestId("textarea");
    const fileUploadComponent = screen.getByTestId("file-upload");

    input.forEach((element) => {
      expect(form).toContain(element);
    });
    expect(form).toContain(btnInput);
    expect(form).toContain(fileUploadComponent);
    expect(textArea).toContain(textArea);
  });
});
