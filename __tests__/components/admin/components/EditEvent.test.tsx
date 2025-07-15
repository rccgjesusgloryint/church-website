import { describe, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventsType, EventType } from "@/lib/types";
import UpdateEventForm from "../../../../components/admin/forms/UpdateEventForm";
import DeleteItems from "../../../../components/admin/components/DeleteItems";
import { BiEdit } from "react-icons/bi";
import EditEvent from "../../../../components/admin/components/EditEvent";

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
  deleteEvent: vi.fn(),
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

describe("EditEvent Component: ", () => {
  const events = [
    {
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
    },
  ] as EventType;

  test("renders 'Card Description' text", () => {
    render(
      <EditEvent
        events={events}
        handleEventEdit={vi.fn()}
        setRefresh={vi.fn()}
      />
    );

    const cardDescription = screen.getByTestId("card-description");
    const cardDescriptionText = cardDescription.innerHTML;

    expect(cardDescription).toBeDefined();
    expect(cardDescriptionText).toBe("Edit Events");
  });

  test("renders events header", () => {
    render(
      <EditEvent
        events={events}
        handleEventEdit={vi.fn()}
        setRefresh={vi.fn()}
      />
    );

    const header = screen.getByText("Events:");

    expect(header).toBeDefined();
  });

  test("renders all event titles if there are events", () => {
    render(
      <EditEvent
        events={events}
        handleEventEdit={vi.fn()}
        setRefresh={vi.fn()}
      />
    );

    events.forEach((event) => {
      const eventTitle = screen.getByText(event.event);
      expect(eventTitle).toBeDefined();
    });
  });

  test("renders both edit and delete icons", () => {
    render(
      <EditEvent
        events={events}
        handleEventEdit={vi.fn()}
        setRefresh={vi.fn()}
      />
    );

    const editIcon = screen.getByTestId("bi-edit");
    const deleteIcon = screen.getByTestId("delete-items");
    expect(editIcon).toBeDefined();
    expect(deleteIcon).toBeDefined();
  });
});
