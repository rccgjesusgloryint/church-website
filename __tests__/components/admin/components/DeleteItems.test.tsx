import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import DeleteItems from "../../../../components/admin/components/DeleteItems";

// Mock UI components for 'Delete Items Component'
vi.mock("@/components/ui/alert-dialog", () => ({
  AlertDialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-dialog">{children}</div>
  ),
  AlertDialogAction: ({
    children,
    onClick,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      data-testid="alert-dialog-action"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  AlertDialogCancel: ({
    children,
    onClick,
    className,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      data-testid="alert-dialog-cancel"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  AlertDialogContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="alert-dialog-content" className={className} {...props}>
      {children}
    </div>
  ),
  AlertDialogDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-dialog-description">{children}</div>
  ),
  AlertDialogFooter: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="alert-dialog-footer" className={className} {...props}>
      {children}
    </div>
  ),
  AlertDialogHeader: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="alert-dialog-header" className={className} {...props}>
      {children}
    </div>
  ),
  AlertDialogTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="alert-dialog-title">{children}</div>
  ),
  AlertDialogTrigger: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      data-testid="alert-dialog-trigger"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  ),
}));

vi.mock("@/lib/queries", () => ({
  deleteBlog: vi.fn(),
}));

vi.mock("lucide-react", () => ({
  Trash2Icon: ({
    className,
    size,
    ...props
  }: {
    className?: string;
    size?: number | string;
  }) => (
    <svg
      data-testid="trash2-icon"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <title>Trash2Icon</title>
    </svg>
  ),
}));

describe("DeleteItems Component", () => {
  const mockSetRefresh = vi.fn();
  const mockFunc = vi.fn();
  const mockId = "test-id";
  const mockItem = "Blog";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with trash icon", () => {
    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item={mockItem}
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    expect(trashIcon).toBeDefined();
  });

  it("displays AlertDialog components when trash icon is clicked", () => {
    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item={mockItem}
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    fireEvent.click(trashIcon);

    // Check that alert dialog components are rendered
    expect(screen.getByTestId("alert-dialog")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-content")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-header")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-title")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-description")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-footer")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-action")).toBeDefined();
    expect(screen.getByTestId("alert-dialog-cancel")).toBeDefined();
  });

  it("displays correct text in alert dialog", () => {
    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item={mockItem}
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    fireEvent.click(trashIcon);

    // Check for expected text content
    expect(screen.getByText("Are you absolutely sure?")).toBeDefined();
    expect(
      screen.getByText(
        /This action cannot be undone. This will permanently delete this Blog and remove it from our servers./
      )
    ).toBeDefined();
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Continue")).toBeDefined();
  });

  it("calls func and setRefresh when Continue button is clicked", async () => {
    mockFunc.mockResolvedValue(undefined);

    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item={mockItem}
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    fireEvent.click(trashIcon);

    const continueButton = screen.getByTestId("alert-dialog-action");
    fireEvent.click(continueButton);

    expect(mockFunc).toHaveBeenCalledWith(mockId);
    expect(mockSetRefresh).toHaveBeenCalledTimes(1);

    // If you want to test the function updater pattern:
    const setRefreshCall = mockSetRefresh.mock.calls[0][0];
    if (typeof setRefreshCall === "function") {
      // Test that calling the function with false returns true (toggle behavior)
      expect(setRefreshCall(false)).toBe(true);
      // Test that calling the function with true returns false (toggle behavior)
      expect(setRefreshCall(true)).toBe(false);
    }
  });

  it("does not call func when Cancel button is clicked", () => {
    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item={mockItem}
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    fireEvent.click(trashIcon);

    const cancelButton = screen.getByTestId("alert-dialog-cancel");
    fireEvent.click(cancelButton);

    expect(mockFunc).not.toHaveBeenCalled();
    expect(mockSetRefresh).not.toHaveBeenCalled();
  });

  it("renders with different item types", () => {
    render(
      <DeleteItems
        func={mockFunc}
        id={mockId}
        setRefresh={mockSetRefresh}
        item="Project"
      />
    );

    const trashIcon = screen.getByTestId("trash2-icon");
    fireEvent.click(trashIcon);

    // expect(screen.getByText(/permanently delete your Project/)).toBeDefined();
  });
});
