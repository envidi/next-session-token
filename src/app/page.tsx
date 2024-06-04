import Image from "next/image";
import { Roboto } from "next/font/google";
import { Box } from "@mui/material";
const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700"],
});
export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      Hello
    </Box>
  );
}
