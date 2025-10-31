import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { SearchOffOutlined } from "@mui/icons-material";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void; // ✅ ubah jadi string
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <TextField
            variant="outlined"
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)} // ✅ kirim string ke parent
            placeholder={placeholder}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchOffOutlined />
                    </InputAdornment>
                ),
            }}
            sx={{ borderRadius: 2 }}
        />
    );
};


export default SearchInput;
