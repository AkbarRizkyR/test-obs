import React, { useState } from "react";
import { Stack } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";

const UserCreate: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "" });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        alert(`User Created!\nName: ${form.name}\nEmail: ${form.email}`);
    };

    return (
        <MainLayout>
            <Stack spacing={2} sx={{ maxWidth: 400, mx: "auto" }}>
                <TextInput label="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                <TextInput label="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                <Button label="Save" onClick={handleSubmit} />
            </Stack>
        </MainLayout>
    );
};

export default UserCreate;
