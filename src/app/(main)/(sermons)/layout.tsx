type Props = {
  children: React.ReactNode;
};
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jesus Glory Athy - Sermons",
};

const layout = async ({ children }: Props) => {
  return <section>{children}</section>;
};

export default layout;
