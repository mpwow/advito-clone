import {Link, useLocation} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


const Header = () => {
    const location = useLocation();
    const isCurrentPageMain = location.pathname === '/';

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h5">
                        AdVito
                    </Typography>
                    {isCurrentPageMain &&
                        <Link to="/add-new-card" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Button
                                onClick={() => {
                                }}
                                variant="text"
                                color="inherit"
                            >
                                <AddIcon/> Разместить объявление
                            </Button>
                        </Link>}
                    {!isCurrentPageMain &&
                        <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Button
                                onClick={() => {
                                }}
                                variant="text"
                                color="inherit"
                            >
                                <ArrowBackIcon/> Вернуться на главную
                            </Button>
                        </Link>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;