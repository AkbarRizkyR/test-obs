import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                textAlign: "center",
            }}
        >
            <CircularProgress size={60} thickness={5} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
