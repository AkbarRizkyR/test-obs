import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Typography,
    Stack,
    Box,
    Divider,
    useTheme,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import Button from "./Button";
import CloseIcon from '@mui/icons-material/Close';

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    user: any;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    if (!user) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={isMobile} 
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: {
                        xs: 0,
                        sm: 3, 
                    },
                    p: {
                        xs: 1, 
                        sm: 2,
                    },
                    background: {
                        xs: "linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(40,40,40,0.98) 100%)", 
                        sm: "linear-gradient(135deg, rgba(25,25,25,0.95) 0%, rgba(50,50,50,0.95) 100%)",
                    },
                    color: "#fff",
                    boxShadow: {
                        xs: "none", 
                        sm: "0 8px 40px rgba(0,0,0,0.4)",
                    },
                    margin: {
                        xs: 0, 
                        sm: 2, 
                    },
                    height: {
                        xs: "100%", 
                        sm: "auto", 
                    },
                    maxHeight: {
                        xs: "100%", 
                        sm: "90vh", 
                    },
                },
            }}
        >
            {isMobile && (
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            '&:hover': {
                                backgroundColor: "rgba(255,255,255,0.2)",
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}

            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: {
                        xs: "1.2rem", 
                        sm: "1.4rem", 
                    },
                    mb: 1,
                    pt: {
                        xs: 3, 
                        sm: 0,
                    },
                }}
            >
                User Details
            </DialogTitle>

            <DialogContent>
                <Stack 
                    spacing={2} 
                    alignItems="center"
                    sx={{
                        pt: {
                            xs: 1, 
                            sm: 2, 
                        }
                    }}
                >
                    <Avatar
                        src={user.image || `https://i.pravatar.cc/150?u=${user.id}`}
                        sx={{
                            width: {
                                xs: 80,  
                                sm: 100, 
                            },
                            height: {
                                xs: 80,
                                sm: 100,
                            },
                            border: "2px solid #00e5ff",
                            boxShadow: "0 0 15px rgba(0,229,255,0.5)",
                        }}
                    />
                    <Box sx={{ textAlign: "center", width: "100%" }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 600,
                                fontSize: {
                                    xs: "1.1rem", 
                                    sm: "1.25rem", 
                                },
                                wordBreak: "break-word", 
                            }}
                        >
                            {user.name}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="gray"
                            sx={{
                                fontSize: {
                                    xs: "0.8rem", 
                                    sm: "0.875rem", 
                                },
                                wordBreak: "break-word",
                            }}
                        >
                            {user.email}
                        </Typography>
                    </Box>

                    <Divider 
                        flexItem 
                        sx={{ 
                            bgcolor: "rgba(255,255,255,0.2)", 
                            my: {
                                xs: 0.5, 
                                sm: 1,   
                            } 
                        }} 
                    />

                    <Box sx={{ width: "100%", textAlign: "left" }}>
                        <Typography 
                            sx={{ 
                                mb: 1,
                                fontSize: {
                                    xs: "0.9rem", 
                                    sm: "1rem",   
                                },
                                wordBreak: "break-word",
                            }}
                        >
                            <b>ID:</b> {user.id}
                        </Typography>
                        <Typography 
                            sx={{ 
                                mb: 1,
                                fontSize: {
                                    xs: "0.9rem",
                                    sm: "1rem",
                                },
                                wordBreak: "break-word",
                            }}
                        >
                            <b>Username:</b> {user.username || "-"}
                        </Typography>
                        <Typography 
                            sx={{ 
                                mb: 1,
                                fontSize: {
                                    xs: "0.9rem",
                                    sm: "1rem",
                                },
                                wordBreak: "break-word",
                            }}
                        >
                            <b>Phone:</b> {user.phone || "-"}
                        </Typography>
                        <Typography 
                            sx={{ 
                                mb: 1,
                                fontSize: {
                                    xs: "0.9rem",
                                    sm: "1rem",
                                },
                                wordBreak: "break-word",
                            }}
                        >
                            <b>Website:</b> {user.website || "-"}
                        </Typography>
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions 
                sx={{ 
                    justifyContent: "center", 
                    mt: {
                        xs: 1, 
                        sm: 1, 
                    },
                    mb: {
                        xs: 2, 
                        sm: 0,
                    },
                    px: {
                        xs: 1, 
                        sm: 2, 
                    }
                }}
            >
                {!isMobile && ( 
                    <Button 
                        label="Close" 
                        onClick={onClose} 
                        startIcon={<CloseIcon />}
                        fullWidth={isTablet}
                    />
                )}
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;