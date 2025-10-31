import React from "react";
import Navbar from "./Navbar";
import { Container, Box } from "@mui/material";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {children}
            </Container>
        </Box>
    );
};

export default MainLayout;
