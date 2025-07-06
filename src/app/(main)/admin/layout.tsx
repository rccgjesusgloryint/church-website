import Unauthorized from "@/components/unauthorized/AdminOnly";
import { getAuthUserDetails, isAdmin } from "@/lib/queries";
import { Metadata } from "next";
import Navbar2 from "../../../../components/navbar/Navbar2";
import { ThemeProvider } from "@/components/theme-provider";

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

  return (
    <div className="h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar2 />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default layout;
