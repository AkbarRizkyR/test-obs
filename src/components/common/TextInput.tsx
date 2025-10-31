import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    fullWidth = true,
}) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            fullWidth={fullWidth}
            sx={{ borderRadius: 2 }}
        />
    );
};

export default TextInput;
