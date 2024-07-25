import ComingSoon from "@/components/comingsoon";
import Unauthorized from "@/components/unauthorized";
import { isAdmin } from "@/lib/queries";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const admin = await isAdmin();
  if (!admin) {
    return <ComingSoon />;
  }
  return <div>{children}</div>;
};

export default layout;
