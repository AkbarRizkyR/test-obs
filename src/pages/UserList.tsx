import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchUsers, deleteUser } from "../store/userSlice"; // Import deleteUser dari slice
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Typography,
    Avatar,
    Stack,
    Paper,
    Grid,
    useMediaQuery,
    useTheme,
    Fade,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Snackbar,
    Alert,
    Menu,
    MenuItem,
    ListItemIcon,
    IconButton
} from "@mui/material";
import Button from "../components/common/Button";
import Search from "../components/common/Search";
import UserModal from "../components/common/UserModal";
import Loading from "../components/common/Loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, dataLoaded } = useSelector((state: RootState) => state.users);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedMenuUser, setSelectedMenuUser] = React.useState<any>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedMenuUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMenuUser(null);
    };

    useEffect(() => {
        // ✅ MODIFIKASI: Hanya fetch data jika belum diload sebelumnya
        if (!dataLoaded && users.length === 0) {
            setShowLoading(true);
            const timer = setTimeout(() => {
                dispatch(fetchUsers()).finally(() => {
                    setTimeout(() => setShowLoading(false), 300);
                });
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // ✅ Jika data sudah ada, langsung hide loading
            setShowLoading(false);
        }
    }, [dispatch, dataLoaded, users.length]);

    const filteredUsers = users.filter((u) =>
        (u.name ?? "").toLowerCase().includes((search ?? "").toString().toLowerCase())
    );

    // Handle delete confirmation
    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            try {
                dispatch(deleteUser(userToDelete.id));
                setSnackbarMessage(`User "${userToDelete.name}" berhasil dihapus`);
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage("Gagal menghapus user");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // 🔹 Jika masih loading → tampilkan komponen Loading dengan animasi fade
    if (loading || showLoading) {
        return (
            <Fade in={true} timeout={400}>
                <Box>
                    <Loading message="Loading Data Users" />
                </Box>
            </Fade>
        );
    }

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
                        <Link to="/create">
                            <Button startIcon={<AddIcon />} label="Add New User" />
                        </Link>
                    </Stack>
                </Stack>
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
                                            xs: "column",
                                            sm: "column",
                                            md: "column",
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
                                        position: "relative", // Untuk positioning dropdown
                                    }}
                                >
                                    {/* Avatar dan User Info */}
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        width: "100%"
                                    }}>
                                        <Avatar
                                            src={user.image}
                                            alt={user.name}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Box sx={{ flexGrow: 1, minWidth: 0 }}> {/* minWidth: 0 untuk mencegah overflow */}
                                            <Typography fontWeight="bold" noWrap>{user.name}</Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {user.email}
                                            </Typography>
                                        </Box>

                                        {/* Dropdown Menu untuk Mobile */}
                                        <Box sx={{
                                            display: { xs: "block", sm: "none" },
                                        }}>
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, user)}
                                                size="small"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    {/* Button Group untuk Tablet/Desktop */}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            width: "100%",
                                            display: { xs: "none", sm: "flex" },
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
                                            startIcon={<VisibilityIcon />}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenModal(true);
                                            }}
                                        />
                                        <Link to={`/edit/${user.id}`} style={{ textDecoration: 'none' }}>
                                            <Button
                                                label="Edit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<EditIcon />}
                                            />
                                        </Link>
                                        <Button
                                            label="Delete"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteClick(user)}
                                        />
                                    </Stack>

                                    {/* Dropdown Menu Component */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedMenuUser?.id === user.id}
                                        onClose={handleMenuClose}
                                        sx={{
                                            display: { xs: "block", sm: "none" },
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenModal(true);
                                                handleMenuClose();
                                            }}
                                        >
                                            <ListItemIcon>
                                                <VisibilityIcon fontSize="small" />
                                            </ListItemIcon>
                                            View
                                        </MenuItem>
                                        <MenuItem
                                            component={Link}
                                            to={`/edit/${user.id}`}
                                            onClick={handleMenuClose}
                                        >
                                            <ListItemIcon>
                                                <EditIcon fontSize="small" />
                                            </ListItemIcon>
                                            Edit
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                handleDeleteClick(user);
                                                handleMenuClose();
                                            }}
                                            sx={{ color: "error.main" }}
                                        >
                                            <ListItemIcon>
                                                <DeleteIcon fontSize="small" color="error" />
                                            </ListItemIcon>
                                            Delete
                                        </MenuItem>
                                    </Menu>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Paper>

            <UserModal open={openModal} onClose={() => setOpenModal(false)} user={selectedUser} />

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Konfirmasi Hapus Pengguna
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Apakah Anda yakin ingin menghapus pengguna <strong>{userToDelete?.name}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        label="Batal"
                        onClick={handleCancelDelete}
                        variant="outlined"
                        color="secondary"
                    />
                    <Button
                        label="Hapus"
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                    />
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    variant="filled"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserList;