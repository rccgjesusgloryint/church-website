import { render, screen } from "@testing-library/react";
import EventsIntro from "../../../components/events/EventsIntro";
import { vi } from "vitest";

const today = new Date(Date.now());
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = months[today.getMonth()];

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} data-testid="next-link" {...props}>
      {children}
    </a>
  ),
}));

describe("EventsIntro: ", () => {
  test("renders h1 title", () => {
    render(<EventsIntro />);

    expect(screen.getByText("Become a part of something great")).toBeDefined();
  });

  test("renders paragraph", () => {
    render(<EventsIntro />);

    expect(
      screen.getByText(/We enjoy being a multi-denominational church/i)
    ).toBeDefined();
  });

  test("renders button", () => {
    render(<EventsIntro />);

    expect(screen.getByTestId("next-link")).toBeDefined();
    expect(screen.getByTestId("next-link").innerHTML).toContain(
      "+ VIEW ALL EVENTS"
    );
  });

  test("renders correct month", () => {
    render(<EventsIntro />);

    expect(screen.getByText(`THIS ${month.toUpperCase()}`)).toBeDefined();
  });
});
