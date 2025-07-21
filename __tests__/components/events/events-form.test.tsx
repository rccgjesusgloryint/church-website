import { describe, vi, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { EventsType } from "@/lib/types";
import EventsForm from "../../../components/events/events-form";

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

vi.mock("@/components/ui/textarea", () => ({
  Textarea: ({ className, ...props }: { className?: string }) => (
    <textarea data-testid="textarea" className={className} {...props} />
  ),
}));
vi.mock("../../../components/media/file-upload", () => ({
  default: ({ className }: { className?: string; apiEndpoint?: string }) => (
    <div data-testid="file-upload" className={className}>
      File Upload Component
    </div>
  ),
}));

vi.mock("react-hot-toast", () => ({
  toast: vi.fn(),
}));

const mockFormWatch = vi.fn();

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
    watch: mockFormWatch,
  })),
}));

vi.mock("@/lib/queries", () => ({
  createEvent: vi.fn(),
}));

describe("EventForm: ", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders the 'Card Title' label", () => {
    render(<EventsForm />);

    const cardDescription = screen.getByTestId("card-title");
    expect(cardDescription).toBeDefined();
    expect(cardDescription.innerHTML).toBe("Add upcoming events!");
  });

  test("renders 4 input components in form component", () => {
    render(<EventsForm />);

    const input = screen.getAllByTestId("input");
    expect(input.length).toBe(4);
  });

  test("renders 'submit button' in form component", () => {
    render(<EventsForm />);

    const input = screen.getByTestId("button");
    expect(input).toBeDefined();
    expect(input.innerHTML).toBe("Create Event");
  });

  test("renders 'FileUpload' component in form component", () => {
    render(<EventsForm />);

    const fileUploadComponent = screen.getByTestId("file-upload");
    expect(fileUploadComponent).toBeDefined();
  });

  test("renders 'textarea' component in form component", () => {
    render(<EventsForm />);

    const textArea = screen.getByTestId("textarea");
    expect(textArea).toBeDefined();
  });

  test("date input fields are present when event is NOT monthly", () => {
    mockFormWatch.mockReturnValue(false);
    render(<EventsForm />);

    const fromDateInput = screen.getByPlaceholderText(
      "From (eg. April 28, 2022)"
    );
    const toDateInput = screen.getByPlaceholderText("To (eg. April 30, 2022)");

    expect(fromDateInput).toBeDefined();
    expect(toDateInput).toBeDefined();
  });

  test("date input fields are NOT present when event IS monthly", () => {
    mockFormWatch.mockReturnValue(true);
    render(<EventsForm />);

    const fromDateInput = screen.queryByPlaceholderText(
      "From (eg. April 28, 2022)"
    );
    const toDateInput = screen.queryByPlaceholderText(
      "To (eg. April 30, 2022)"
    );

    expect(fromDateInput).toBeNull();
    expect(toDateInput).toBeNull();
  });

  test("renders all 7/7 form labels when event is a monthly event", () => {
    mockFormWatch.mockReturnValue(false);

    render(<EventsForm />);
    const formLabelNames = [
      "Event Name",
      "From Date",
      "To Date",
      "Address",
      "Event Poster Image",
      "Event Description",
      "Is this a Monthly event?",
    ];
    const formLabels = screen.getAllByTestId("form-label");

    expect(formLabels.length).toBe(7);

    formLabels.forEach((element) => {
      formLabelNames.includes(element.innerHTML);
    });
  });

  test("renders 5/7 labels when event is not a monthly event", () => {
    vi.mocked(mockFormWatch).mockReturnValue(true);

    render(<EventsForm />);

    const formLabelNames = [
      "Event Name",
      "From Date",
      "To Date",
      "Address",
      "Event Poster Image",
      "Event Description",
      "Is this a Monthly event?",
    ];
    const formLabels = screen.getAllByTestId("form-label");

    expect(formLabels.length).toBe(5);

    formLabels.forEach((element) => {
      formLabelNames.includes(element.innerHTML);
    });
  });

  test("form has all fields rendered on page", () => {
    render(<EventsForm />);
    const form = screen.getByTestId("form");
    const input = screen.getAllByTestId("input");
    const btnInput = screen.getByTestId("button");
    const textArea = screen.getByTestId("textarea");
    const select = screen.getByTestId("select");
    const fileUploadComponent = screen.getByTestId("file-upload");

    input.forEach((element) => {
      expect(form).toContain(element);
    });
    expect(form).toContain(btnInput);
    expect(form).toContain(fileUploadComponent);
    expect(form).toContain(textArea);
    expect(form).toContain(select);
  });
});
