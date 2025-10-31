import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions } from "@mui/material";
import Button from "./Button";

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    user: any;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user }) => {
    if (!user) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
                <Typography><b>ID:</b> {user.id}</Typography>
                <Typography><b>Name:</b> {user.name}</Typography>
                <Typography><b>Email:</b> {user.email}</Typography>
            </DialogContent>
            <DialogActions>
                <Button label="Close" onClick={onClose} variant="outlined" />
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
