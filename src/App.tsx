import { ThemeProvider } from "@mui/material";
import { theme } from "./ui/theme";
import { ChatPage } from "./ui/pages/Chat";

export default function()
{
   return <ThemeProvider theme={theme}>
      <ChatPage />
   </ThemeProvider>
   
};