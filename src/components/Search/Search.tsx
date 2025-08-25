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
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <TextField id="outlined-basic" label="Поиск по объявлениям" variant="outlined"
                       sx={{flexGrow: 1}}
                       value={value}
                       onChange={(e) => onChange(e.target.value)}/>
            <Button variant="contained" sx={{borderRadius:'0 10px 10px 0'}}><SearchIcon/>Найти</Button>
        </Box>
    );
}

export default Search;