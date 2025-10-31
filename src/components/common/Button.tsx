import React from "react";
import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
    /** Bisa teks, icon, atau kombinasi keduanya */
    label?: React.ReactNode;
    onClick?: () => void;
    color?: "primary" | "secondary" | "success" | "error";
    variant?: "contained" | "outlined" | "text";
    fullWidth?: boolean;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    color = "primary",
    variant = "contained",
    fullWidth = false,
    disabled = false,
    startIcon,
    endIcon,
}) => {
    return (
        <MUIButton
            color={color}
            variant={variant}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{ textTransform: "none", borderRadius: 2 }}
        >
            {label}
        </MUIButton>
    );
};

export default Button;
