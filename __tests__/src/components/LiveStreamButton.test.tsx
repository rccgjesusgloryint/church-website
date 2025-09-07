import LiveStreamButton from "@/components/LiveStreamButton";
import { useCheckIsLive } from "@/hooks/useCheckLive";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { usePathname, useSearchParams } from "next/navigation";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} data-testid="next-link" {...props}>
      {children}
    </a>
  ),
}));

const mockUseCheckIsLive = vi.fn();

const mockPush = vi.fn();

vi.mock("@/hooks/useCheckLive", () => ({
  useCheckIsLive: vi.fn(() => ({
    live: false,
  })),
}));

describe("LiveStreamButton Component:", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Component when live is true", () => {
    vi.mocked(useCheckIsLive).mockReturnValue({
      live: true,
    });

    render(<LiveStreamButton channelUrl="www.temp.com" />);
    const component = screen.getByTestId("next-link");

    expect(component).toBeDefined();
    expect(component.innerHTML).toContain("LIVE NOW");
  });

  test("dont render Component when live is false", () => {
    vi.mocked(useCheckIsLive).mockReturnValue({
      live: false,
    });

    render(<LiveStreamButton channelUrl="www.temp.com" />);
    const component = screen.queryByTestId("next-link");

    expect(component).toBeNull();
  });
});
