import { EventType } from "@/lib/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Cards from "../../../components/events/Cards";

vi.mock("react-icons/fa", () => ({
  FaRegMap: ({ className }: { className?: string }) => (
    <span data-testid="fa-map" className={className}>
      FaRegMap Component
    </span>
  ),
}));

vi.mock("react-icons/lu", () => ({
  LuClock3: ({ className }: { className?: string }) => (
    <span data-testid="lu-clock" className={className}>
      LuClock3 Component
    </span>
  ),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const events = [
  {
    id: 1,
    description: "Temp event cards description 1",
    event: "Temp Event Card Title 1",
    location: "Temp Event Card Location 1",
    date: ["July 25, 2025", "Date To"],
    monthly: false,
  },
  {
    id: 2,
    description: "Temp event cards description 2",
    event: "Temp Event Card Title 2",
    location: "Temp Event Card Location 2",
    date: ["July 25, 2025", "Date To"],
    monthly: false,
  },
] as EventType;

describe("Event Cards: ", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  test("displays the Event Cards day+month", () => {
    render(<Cards events={events} />);

    events.forEach((eventCard) => {
      if (!eventCard.date) return false;
      const cardDay =
        eventCard.date[0].split(" ")[1].length > 2
          ? eventCard.date[0].split(" ")[1].slice(0, 2)
          : eventCard.date[0].split(" ")[1].slice(0, 1);
      const cardMonth =
        eventCard.date[0].length > 3
          ? eventCard.date[0].slice(0, 3)
          : eventCard.date[0];

      expect(cardDay).toBeDefined();
      expect(cardMonth).toBeDefined();
      expect(cardDay).toBe("25");
      expect(cardMonth).toBe("Jul");
    });
  });

  test("displays the Event Cards Titles", () => {
    render(<Cards events={events} />);

    events.forEach((eventCard) => {
      const cardDate = screen.getByRole("heading", {
        level: 2,
        name: eventCard.event,
      });
      expect(cardDate).toBeDefined();
    });
  });

  test("displays Event Cards Icons", () => {
    render(<Cards events={events} />);

    screen.getAllByTestId("fa-map").forEach((element) => {
      expect(element).toBeDefined();
      expect(element.innerHTML).toBe("FaRegMap Component");
    });
    screen.getAllByTestId("lu-clock").forEach((element) => {
      expect(element).toBeDefined();
      expect(element.innerHTML).toBe("LuClock3 Component");
    });
  });

  test("displays Event Cards From dates", () => {
    render(<Cards events={events} />);

    screen.getAllByText("July 25, 2025").forEach((date) => {
      expect(date).toBeDefined();
    });
  });

  test("displays Event Cards To dates", () => {
    render(<Cards events={events} />);

    screen.getAllByText("Date To").forEach((date) => {
      expect(date).toBeDefined();
    });
  });

  test("displays Event Cards Locations", () => {
    render(<Cards events={events} />);
    events.forEach((event) => {
      const location =
        event.location.length > 25
          ? // events[1].location.split(" ").slice(0, 3)
            event.location.slice(0, 25) + "..."
          : event.location;

      expect(screen.getAllByText(location)).toBeDefined();
    });
  });

  test("calls handleNavigation when READ MORE button is clicked", () => {
    render(<Cards events={events} />);

    // Get the first READ MORE button
    const firstButton = screen.getAllByText("READ MORE")[0];

    // Click the button
    fireEvent.click(firstButton);

    // Assert that router.push was called with the correct argument
    expect(mockPush).toHaveBeenCalledWith("/events/1");
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  test("calls handleNavigation with correct event ID for second event", () => {
    render(<Cards events={events} />);

    // Get the second READ MORE button
    const secondButton = screen.getAllByText("READ MORE")[1];

    // Click the button
    fireEvent.click(secondButton);

    // Assert that router.push was called with the correct argument
    expect(mockPush).toHaveBeenCalledWith("/events/2");
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  test('displays "No events yet!" when events array is empty', () => {
    render(<Cards events={[]} />);

    expect(screen.getByText("No events yet!")).toBeDefined();
  });

  test("only displays maximum 3 events", () => {
    const manyEvents = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      event: `Event ${i + 1}`,
      date: ["July 25, 2025", "Date To"],
      location: `Location ${i + 1}`,
      description: "TEmp description",
      monthly: false,
    })) as EventType;

    render(<Cards events={manyEvents} />);

    // Should only show 3 buttons (slice(0, 3))
    const buttons = screen.getAllByText("READ MORE");
    expect(buttons).toHaveLength(3);
  });

  test("handles navigation for all visible events", () => {
    const threeEvents = Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      event: `Event ${i + 1}`,
      date: ["July 25, 2025", "Date To"],
      location: `Location ${i + 1}`,
      description: "TEmp description",
      monthly: false,
    })) as EventType;

    render(<Cards events={threeEvents} />);

    const buttons = screen.getAllByText("READ MORE");

    // Click each button and verify navigation
    buttons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockPush).toHaveBeenCalledWith(`/events/${index + 1}`);
    });

    expect(mockPush).toHaveBeenCalledTimes(3);
  });
});
