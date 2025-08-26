import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {Box, Button, Typography} from "@mui/material";

type ErrorProps = {
    errorMessage: string;
    retryFn: () => void;
}


const Error = ( { errorMessage, retryFn }: ErrorProps ) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                color: '#bdbdbd',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <WarningAmberRoundedIcon sx={{height: 110, width: 110, color: '#bdbdbd'}}/>
            <Typography variant={'h4'}>{errorMessage}</Typography>
            <Button variant="outlined" onClick={retryFn}>Обновить страницу</Button>
        </Box>
    )
}

export default Error;