import Unauthorized from "@/components/unauthorized/AdminOnly";
import { isAdmin } from "@/lib/queries";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Jesus Glory Athy",
};

const layout = async ({ children }: Props) => {
  const admin = await isAdmin();
  if (!admin) {
    return <Unauthorized />;
  }
  return <div>{children}</div>;
};

export default layout;
