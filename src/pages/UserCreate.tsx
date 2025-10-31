import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { AppDispatch, RootState } from "../store";
import { addUserAsync } from "../store/userSlice";
import Button from "../components/common/Button";

const UserCreate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const users = useSelector((state: RootState) => state.users.users);
    const loading = useSelector((state: RootState) => state.users.loading);

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
        website: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openConfirm, setOpenConfirm] = useState(false);

    // 🧠 Validasi input
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) newErrors.name = "Nama wajib diisi.";
        else if (form.name.length < 3)
            newErrors.name = "Nama minimal 3 karakter.";

        if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = "Format email tidak valid.";

        if (!form.username.trim()) newErrors.username = "Username wajib diisi.";
        else if (form.username.length < 3)
            newErrors.username = "Username minimal 3 karakter.";

        if (!form.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi.";
        else if (!/^[0-9]+$/.test(form.phone))
            newErrors.phone = "Nomor telepon hanya boleh angka.";
        else if (form.phone.length < 8)
            newErrors.phone = "Nomor telepon minimal 8 digit.";

        if (!form.website.trim()) newErrors.website = "Website wajib diisi.";
        else if (!/^https?:\/\/.+/.test(form.website))
            newErrors.website = "Website harus diawali dengan http:// atau https://";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleOpenConfirm = () => {
        if (validateForm()) setOpenConfirm(true);
        else
            Swal.fire({
                icon: "warning",
                title: "Data belum valid!",
                text: "Periksa kembali form Anda.",
                confirmButtonColor: "#1976d2",
            });
    };

    const handleConfirmSave = async () => {
        try {
            setOpenConfirm(false);

            await dispatch(addUserAsync(form)).unwrap();

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: `User ${form.name} berhasil ditambahkan.`,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/");

            setForm({
                name: "",
                email: "",
                username: "",
                phone: "",
                website: "",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi kesalahan saat menambahkan pengguna.",
                confirmButtonColor: "#d32f2f",
            });
        }
    };

    return (
        <>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 700,
                    mx: "auto",
                    mt: 6,
                    background:
                        "linear-gradient(135deg, rgba(245,245,255,0.95) 0%, rgba(230,240,255,0.9) 100%)",
                    backdropFilter: "blur(8px)",
                    position: "relative",
                }}
            >
                {loading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(255,255,255,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            zIndex: 10,
                        }}
                    >
                        <CircularProgress color="primary" />
                    </div>
                )}

                <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight={700}
                    mb={2}
                    color="primary"
                >
                    Tambah Pengguna Baru
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                    {[
                        { label: "Nama", key: "name" },
                        { label: "Email", key: "email" },
                        { label: "Username", key: "username" },
                        { label: "Nomor Telepon", key: "phone" },
                        { label: "Website", key: "website" },
                    ].map((field) => (
                        <Grid key={field.key} size={{ xs: 12 }}>
                            <TextField
                                label={field.label}
                                value={(form as any)[field.key]}
                                onChange={(e) =>
                                    handleChange(field.key, e.target.value)
                                }
                                fullWidth
                                error={!!errors[field.key]}
                                helperText={errors[field.key]}
                            />
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                        <Button
                            label="Simpan Pengguna"
                            onClick={handleOpenConfirm}
                            fullWidth
                            color="primary"
                            variant="contained"
                            disabled={loading}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Modal Konfirmasi */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle fontWeight={600}>Konfirmasi Simpan</DialogTitle>
                <DialogContent dividers>
                    Apakah Anda yakin ingin menyimpan pengguna ini?
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        label="Batal"
                        variant="outlined"
                        onClick={() => setOpenConfirm(false)}
                    />
                    <Button
                        label="Ya, Simpan"
                        color="primary"
                        onClick={handleConfirmSave}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserCreate;
