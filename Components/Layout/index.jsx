import Navbar from "../Sidebar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MainPanel from "./MainPanel";
import Footer from "../Footer/Footer";
import Wallet from "../Wallet/Wallet";
import HomeNavbar from "../Sidebar/HomeNav";
import { useRouter } from "next/router";
import HomePanel from "../Landing/HomePanel";
import { useBreakpointValue } from "@chakra-ui/media-query";
import HomeFooter from "../Landing/HomeFooter";

const Layout = ({ children }) => {
  const router = useRouter();
  const lgg = useBreakpointValue({ lg: "960px" });
  return router.asPath.includes("home") == true ? (
    <>
      <HomeNavbar />
      <HomePanel>{children}</HomePanel>
      <HomeFooter />
    </>
  ) : (
    <>
      <Navbar />
      <Sidebar />
      {lgg && <Wallet />}
      <MainPanel>{children}</MainPanel>
      <Footer />
    </>
  );
};

export default Layout;
