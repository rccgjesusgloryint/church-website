import { EventType } from "@/lib/types";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CreateEvent from "../../../components/events/CreateEvent";

vi.mock("../../../components/events/events-form", () => ({
  default: () => <div data-testid="events-form">Events Form</div>,
}));

describe("CreateEvent component page:", () => {
  test("renders 'EventsForm' component", () => {
    render(<CreateEvent />);

    expect(screen.getByTestId("events-form")).toBeDefined();
  });
});
