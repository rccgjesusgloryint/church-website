import { EventType } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import EventsPreview from "../../../components/events/EventsPreview";

vi.mock("../../../components/events/EventsIntro", () => ({
  default: () => <div data-testid="events-intro">EventsIntro</div>,
}));

vi.mock("../../../components/events/EventCards", () => ({
  default: ({
    className,
  }: {
    className?: string;
    events: EventType[];
    isLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div data-testid="event-cards" className={className}>
      EventCards
    </div>
  ),
}));

describe("EventsPreview Component:", () => {
  test("renders 'EventsIntro' component", () => {
    render(<EventsPreview />);

    expect(screen.getByTestId("events-intro")).toBeDefined();
  });

  test("renders 'EventCards' component", () => {
    render(<EventsPreview />);

    expect(screen.getByTestId("event-cards")).toBeDefined();
  });
});
