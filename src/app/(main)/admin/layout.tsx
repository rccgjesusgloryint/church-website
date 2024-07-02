import Unauthorized from "@/components/ui/unauthorized";
import { isAdmin } from "@/lib/queries";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const admin = await isAdmin();
  if (!admin) {
    return <Unauthorized />;
  }
  return <div>{children}</div>;
};

export default layout;
