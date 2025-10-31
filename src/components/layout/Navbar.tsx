import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Breadcrumbs,
    Link
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();

    // Fungsi untuk generate breadcrumb dari pathname
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter((x) => x);

        const breadcrumbs = [
            <Link
                key="home"
                component={RouterLink}
                to="/"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
        ];

        // Tambahkan setiap segment path
        pathnames.forEach((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

            if (isLast) {
                breadcrumbs.push(
                    <Typography key={name} color="white">
                        {formattedName}
                    </Typography>
                );
            } else {
                breadcrumbs.push(
                    <Link
                        key={name}
                        component={RouterLink}
                        to={routeTo}
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        {formattedName}
                    </Link>
                );
            }
        });

        return breadcrumbs;
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Test OBS
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" sx={{ color: "white" }} />}
                    aria-label="breadcrumb"
                    sx={{ color: "white" }}
                >
                    {generateBreadcrumbs()}
                </Breadcrumbs>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;