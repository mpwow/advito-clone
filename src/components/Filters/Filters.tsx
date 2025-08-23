import styles from "./Filters.module.scss";
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {useState} from "react";

type FiltersProps = {
    onChange: (category: string) => void;
    onDelete: () => void;
}

const Filters = ({onChange, onDelete}: FiltersProps) => {

    const [filterIsSelected, setFilterIsSelected] = useState('');

    return (
        <Box className={styles.filtersContainer}>
            {filterIsSelected === '' &&
            <>
                <Chip key={'Недвижимость'} label={'Недвижимость'} variant="outlined" onClick={() => {
                    onChange('Недвижимость')
                    setFilterIsSelected('Недвижимость')
                }}/>
                <Chip key={'Услуги'} label={'Услуги'} variant="outlined" onClick={() => {
                    onChange('Услуги')
                    setFilterIsSelected('Услуги')
                }}/>
                <Chip key={'Авто'} label={'Авто'} variant="outlined" onClick={() => {
                    onChange('Авто')
                    setFilterIsSelected('Авто')
                }}/>
            </>}

            {filterIsSelected === 'Недвижимость' &&
                <>
                    <Chip key={'Недвижимость'} label={'Недвижимость'} onClick={() => {
                        onChange('Недвижимость')
                        setFilterIsSelected('Недвижимость')
                    }}
                          onDelete={()=>{
                              onDelete();
                              setFilterIsSelected('')
                          }}/>
                </>}


            {filterIsSelected === 'Услуги' &&
                <>
                    <Chip key={'Услуги'} label={'Услуги'} onClick={() => {
                        onChange('Услуги')
                        setFilterIsSelected('Услуги')
                    }}
                          onDelete={()=>{
                              onDelete();
                              setFilterIsSelected('')
                          }}/>
                </>}


            {filterIsSelected === 'Авто' &&
                <>
                    <Chip key={'Авто'} label={'Авто'} onClick={() => {
                        onChange('Авто')
                        setFilterIsSelected('Авто')
                    }}
                          onDelete={()=>{
                              onDelete();
                              setFilterIsSelected('')
                          }}/>
                </>}

        </Box>
    )
}

export default Filters;