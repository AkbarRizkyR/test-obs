import React from "react";
import Navbar from "./Navbar";
import { Container, Box, useTheme, useMediaQuery } from "@mui/material";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const getContainerPadding = () => {
        if (isXs) return { pt: 2, pb: 2, px: 2 };
        if (isSm) return { pt: 3, pb: 3, px: 3 };
        if (isMd) return { pt: 3, pb: 3, px: 4 };
        return { pt: 4, pb: 4, px: 6 };
    };

    const getMaxWidth = () => {
        if (isXs) return '100%';
        if (isSm) return '100%';
        if (isMd) return '1200px';
        return '1600px';
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Navbar />
            <Container 
                component="main"
                maxWidth={false}
                sx={{ 
                    flex: 1,
                    ...getContainerPadding(),
                    width: '100%',
                    maxWidth: `${getMaxWidth()} !important`,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {children}
                </Box>
            </Container>
        </Box>
    );
};

export default MainLayout;