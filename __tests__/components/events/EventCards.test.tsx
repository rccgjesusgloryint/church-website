import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import EventCards from "../../../components/events/EventCards";
import { EventType } from "@/lib/types";

vi.mock("../../../components/Loader", () => ({
  default: () => <div data-testid="loader">Loader Component</div>,
}));

vi.mock("../../../components/events/Cards", () => ({
  default: () => <div data-testid="cards">Cards Component</div>,
}));

const mockEvents = [
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

describe("EventCards Compenent:", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays Loader component if 'isLoading' variable is true", () => {
    render(<EventCards events={mockEvents} isLoading={true} />);

    expect(screen.getByTestId("loader")).toBeDefined();
  });

  test("displays EventCards component if 'isLoading' variable is false", () => {
    render(<EventCards events={mockEvents} isLoading={false} />);

    expect(screen.getByTestId("cards")).toBeDefined();
  });
});
