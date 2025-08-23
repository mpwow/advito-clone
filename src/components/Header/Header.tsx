import styles from "./Header.module.scss";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import {Link} from "react-router-dom";

type HeaderProps = {
    onClick: () => void;
}

const Header = ({ onClick }: HeaderProps) => {
    return (
        <Box className={styles.headerContainter}>
            <Box className={styles.headerLogoContainter}>
                <BusinessCenterIcon />
                <Typography variant="h1">
                    AdVito
                </Typography>
            </Box>
            <Box className={styles.headerControlsContainer}>
                <Button variant="outlined" className={styles.loginButton}>Войти</Button>
                <Link to="/add-new-card">
                <Button className={styles.addButton} onClick={onClick} variant="contained"><AddIcon/>
                    Разместить объявление
                </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Header;