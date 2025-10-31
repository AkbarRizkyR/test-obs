import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchUsers } from "../store/userSlice";
import {
    Box,
    Typography,
    Avatar,
    Stack,
    Paper,
    Grid,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Button from "../components/common/Button";
import Search from "../components/common/Search";
import UserModal from "../components/common/UserModal";
import Loading from "../components/common/Loading";

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = users.filter((u) =>
        (u.name ?? "").toLowerCase().includes((search ?? "").toString().toLowerCase())
    );

    if (loading) return <Loading message="Memuat daftar pengguna..." />;
    if (error)
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                {error}
            </Typography>
        );

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#f9f9fb", minHeight: "100vh" }}>
            <Paper
                sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    boxShadow: 3,
                    maxWidth: "1200px",
                    mx: "auto",
                }}
            >
                {/* Header Section */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    mb={3}
                    spacing={isMobile ? 2 : 3}
                >
                    <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
                        Dashboard Pengguna
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        width={{ xs: "100%", sm: "auto" }}
                    >
                        <Search
                            value={search}
                            onChange={setSearch}
                            placeholder="Cari pengguna..."
                        />
                        <Button
                            label="Tambah Pengguna"
                            onClick={() => alert("Go to add page")}
                            fullWidth={isMobile}
                        />
                    </Stack>
                </Stack>

                {/* User Cards Grid */}
                <Grid container spacing={2}>
                    {filteredUsers.length === 0 ? (
                        <Typography
                            align="center"
                            sx={{ width: "100%", py: 5, color: "gray" }}
                        >
                            Tidak ada pengguna ditemukan.
                        </Typography>
                    ) : (
                        filteredUsers.map((user) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={user.id}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column", // mobile: tumpuk
                                            sm: "row",    // tablet: sejajar
                                            md: "column", // laptop: tombol di bawah teks
                                            lg: "column", // desktop juga di bawah
                                        },
                                        alignItems: {
                                            xs: "flex-start",
                                            sm: "center",
                                            md: "flex-start",
                                        },
                                        gap: 2,
                                        boxShadow: 1,
                                        transition: "all 0.3s ease",
                                        "&:hover": { boxShadow: 3, transform: "translateY(-3px)" },
                                    }}
                                >
                                    <Avatar
                                        src={user.image}
                                        alt={user.name}
                                        sx={{ width: 56, height: 56 }}
                                    />

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography fontWeight="bold">{user.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </Box>

                                    <Stack
                                        direction={{ xs: "row", sm: "row", md: "row" }}
                                        spacing={1}
                                        sx={{
                                            width: { xs: "100%", sm: "auto", md: "100%" },
                                            justifyContent: {
                                                xs: "space-between",
                                                sm: "flex-end",
                                                md: "flex-start",
                                            },
                                        }}
                                    >
                                        <Button
                                            label="View"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenModal(true);
                                            }}
                                        />
                                        <Button
                                            label="Edit"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => alert("Go to edit page")}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>

            </Paper>

            <UserModal open={openModal} onClose={() => setOpenModal(false)} user={selectedUser} />
        </Box>
    );
};

export default UserList;
