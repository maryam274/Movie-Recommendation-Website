import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import GlobalLoading from "../components/GlobalLoading";
import Topbar from "../components/Navbar";


// main layout
const MainLayout = () => {

  return (
    <>
      {/* globalloading */}
      <GlobalLoading />
      {/* globalloading */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;