import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div">
                    User Management
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
