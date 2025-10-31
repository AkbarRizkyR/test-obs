import React, { useState, useEffect } from "react";
import { Stack, CircularProgress, Paper, Typography, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { editUser } from "../store/userSlice";
import type { AppDispatch, RootState } from "../store";
import Swal from "sweetalert2";

const UserEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { users, loading } = useSelector((state: RootState) => state.users);
    const user = users.find((u) => u.id === Number(id));

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
        website: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                username: user.username || "",
                phone: user.phone || "",
                website: user.website || ""
            });
        }
    }, [user]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = (): boolean => {
        if (!form.name.trim()) {
            Swal.fire("Error", "Nama wajib diisi!", "error");
            return false;
        }

        if (!form.email.trim()) {
            Swal.fire("Error", "Email wajib diisi!", "error");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Swal.fire("Error", "Format email tidak valid!", "error");
            return false;
        }

        if (!form.username.trim()) {
            Swal.fire("Error", "Username wajib diisi!", "error");
            return false;
        }

        if (!form.phone.trim()) {
            Swal.fire("Error", "Nomor telepon wajib diisi!", "error");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800)); 

            if (user) {
                dispatch(
                    editUser({
                        ...user,
                        name: form.name,
                        email: form.email,
                        username: form.username,
                        phone: form.phone,
                        website: form.website
                    })
                );
            }

            Swal.fire({
                title: "Berhasil!",
                text: "Data pengguna berhasil diperbarui!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data!", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (loading) {
        return (
            <MainLayout>
                <Stack alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2 }}>Memuat data pengguna...</Typography>
                </Stack>
            </MainLayout>
        );
    }

    if (!user) {
        return (
            <MainLayout>
                <Stack alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
                    <Typography variant="h6" color="error">
                        Pengguna tidak ditemukan
                    </Typography>
                    <Button
                        label="Kembali ke Beranda"
                        onClick={() => navigate("/")}
                    />
                </Stack>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 4,
                mb: 4
            }}>
                <Paper sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    boxShadow: 3
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            textAlign: "center",
                            fontWeight: 600,
                            color: "primary.main"
                        }}
                    >
                        Edit Pengguna
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                        <TextInput
                            label="Nama Lengkap"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Masukkan nama lengkap"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextInput
                            label="Username"
                            value={form.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            placeholder="Masukkan username"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }   }>
                        <TextInput
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="contoh@email.com"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextInput
                            label="Nomor Telepon"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="Contoh: 08123456789"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextInput
                            label="Website"
                            value={form.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                            placeholder="Contoh: contoh.com"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ mt: 4 }}
                >
                    <Button
                        label={submitting ? "Menyimpan..." : "Update Data"}
                        onClick={handleSubmit}
                        disabled={submitting}
                        fullWidth
                        variant="contained"
                        color="primary"
                    />
                    <Button
                        label="Batal"
                        onClick={handleCancel}
                        disabled={submitting}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                    />
                </Stack>

                {/* Preview Data */}
                <Box sx={{
                    mt: 4,
                    p: 2,
                    backgroundColor: "grey.50",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200"
                }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Preview Data:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Nama:</strong> {form.name || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Username:</strong> {form.username || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {form.email || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Telepon:</strong> {form.phone || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Website:</strong> {form.website || "-"}
                    </Typography>
                </Box>
            </Paper>
        </Box>
        </MainLayout >
    );
};

export default UserEdit;