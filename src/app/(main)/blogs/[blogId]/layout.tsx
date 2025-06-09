import Unauthorized from "@/components/unauthorized/MembersOnly";
import { accessCheck } from "@/lib/queries";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const userRole = await accessCheck();
  if (!userRole) {
    return <Unauthorized />;
  }
  return <section>{children}</section>;
};

export default layout;
