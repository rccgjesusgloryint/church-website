import { useCheckIsLive } from "@/hooks/useCheckLive";
import { getLastSundayOfTheMonthNumber } from "@/lib/actions";
import { checkIsLiveParams } from "@/lib/types";
import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/some/path",
    // Return a URLSearchParams-like object that has .toString()
    useSearchParams: () => new URLSearchParams("foo=bar&baz=1"),
  };
});

// Mock useNavbarAuth hook
vi.mock("@/hooks/useCheckIsLive", () => ({
  useCheckIsLive: vi.fn(() => ({
    dayOfMonth: 0,
    dayOfWeek: 0,
    hours: 0,
    lastSunday: 0,
    mins: 0,
  })),
}));

describe("useCheckIsLive hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // If your hook relies on current time, control it:
    vi.useFakeTimers();
    vi.useRealTimers();
  });

  it("live is true when its a Sunday and the time is at 10:30am", () => {
    const initialProps = {
      mins: new Date("2025-08-31T10:30:00Z").getMinutes(),
      dayOfMonth: new Date("2025-08-31T10:30:00Z").getDate(),
      dayOfWeek: new Date("2025-08-31T10:30:00Z").getDay(),
      hours: new Date("2025-08-31T10:30:00Z").getHours(),
      lastSunday: getLastSundayOfTheMonthNumber(
        new Date("2025-08-31T10:30:00Z").getFullYear(),
        new Date("2025-08-31T10:30:00Z").getMonth()
      ),
    } as checkIsLiveParams;

    const { result } = renderHook((props) => useCheckIsLive(props), {
      initialProps,
    });

    expect(result.current.live).toBe(true);
  });
  it("live is true when its a Sunday , 6pm and its the last Sunday of the month", () => {
    const initialProps = {
      mins: new Date("2025-08-31T05:00:00Z").getMinutes(),
      dayOfMonth: new Date("2025-08-31T09:30:00Z").getDate(),
      dayOfWeek: new Date("2025-08-31T09:30:00Z").getDay(),
      hours: new Date("2025-08-31T18:00:00Z").getHours(),
      lastSunday: getLastSundayOfTheMonthNumber(
        new Date("2025-08-31T09:30:00Z").getFullYear(),
        new Date("2025-08-31T09:30:00Z").getMonth()
      ),
    } as checkIsLiveParams;

    const { result } = renderHook((props) => useCheckIsLive(props), {
      initialProps,
    });

    expect(result.current.live).toBe(true);
  });
});
