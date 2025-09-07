// hooks/useNavbarAuth.ts
import { useEffect, useState } from "react";
import { checkIsLiveParams } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";

export function useCheckIsLive({
  dayOfWeek,
  dayOfMonth,
  hours,
  lastSunday,
  mins,
}: checkIsLiveParams) {
  const [live, setIsLive] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    // check if its either Sunday at 10:30am or its praise night last sunday of the month at 6pm
    // check its greater than or equal to the time it starts and less than or equal to the time it finishes
    // - 10:30am -> 13:30pm - 18:00 -> 20:10
    if (
      (dayOfWeek === 0 && hours >= 10 && hours < 14) ||
      (dayOfWeek === 0 &&
        hours >= 18 &&
        hours < 21 &&
        dayOfMonth === lastSunday)
    ) {
      setIsLive(true);
    }
  }, [pathname, searchParams.toString()]);

  return { live };
}
