// hooks/useNavbarAuth.ts
import { useEffect, useState } from "react";
import { getAuthUserDetails } from "@/lib/queries";

export function useNavbarAuth() {
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const navbarCheck = async () => {
      const authedUser = await getAuthUserDetails();
      if (authedUser === null) {
        setAdmin(false);
        setLoaded(true);
        return;
      }
      const isAuthorized = authedUser?.member === "MEMBER" ? false : true;
      setAdmin(isAuthorized);
      setLoaded(true);
    };
    navbarCheck();
  }, []);

  return { admin, loaded };
}
