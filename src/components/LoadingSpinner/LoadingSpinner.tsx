import {Box, CircularProgress} from "@mui/material";

const LoadingSpinner = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            color: '#bdbdbd',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
        }}>
            <CircularProgress/>
        </Box>
    )
}

export default LoadingSpinner;