// components/common/Loading.jsx
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = ({ message = "Memuat data..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
                gap: 2,
            }}
        >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
