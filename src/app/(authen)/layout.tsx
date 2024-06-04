import React from "react";
import Header from "../component/Header";
import { Box } from "@mui/material";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header/> */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          background: "background.paper",
          borderRadius: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default AuthLayout;
