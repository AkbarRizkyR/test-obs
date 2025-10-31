import React from "react";
import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    color?: "primary" | "secondary" | "success" | "error";
    variant?: "contained" | "outlined" | "text";
    fullWidth?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    color = "primary",
    variant = "contained",
    fullWidth = false,
    disabled = false,
}) => {
    return (
        <MUIButton
            color={color}
            variant={variant}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
            sx={{ textTransform: "none", borderRadius: 2 }}
        >
            {label}
        </MUIButton>
    );
};

export default Button;
