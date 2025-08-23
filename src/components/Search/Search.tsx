import styles from './Search.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
    value: string;
    onChange: (value: string) => void;
}

const Search = ({value, onChange}: SearchProps) => {
    return (
        <Box className={styles.searchContainer}>

            <TextField id="outlined-basic" label="Поиск по объявлениям" variant="outlined" className={styles.search} value={value}
                       onChange={(e)=> onChange(e.target.value)} />
            <Button variant="contained" className={styles.searchButton}><SearchIcon/>Найти</Button>
        </Box>
    );
}

export default Search;