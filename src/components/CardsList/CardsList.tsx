import Search from "../Search/Search.tsx";
import Filters from "../Filters/Filters.tsx";
import Card from "../Card/Card.tsx";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";
import {Box, Typography, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const CardsList = () => {
    const {
        cards,
        getCards,
        searchQuery,
        setSearchQuery,
        setFilterByCategory,
        filterByCategory,
        error,
        isLoading
    } = useCardStore();

    useEffect(() => {
        getCards();
    }, [getCards]);

    const filteredCards = cards.filter(card => {
        const matchBySearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchByCategory = filterByCategory === '' || card.type === filterByCategory;
        return matchBySearch && matchByCategory;
    });

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "30px",
            margin: "0 auto",
        }}>

            <Search value={searchQuery} onChange={setSearchQuery}/>
            <Filters onChange={setFilterByCategory} onDelete={() => setFilterByCategory('')}/>

            {isLoading && !error && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#bdbdbd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}>
                    <CircularProgress/>
                </Box>
            )}

            {error &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#bdbdbd',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <WarningAmberRoundedIcon sx={{height: 110, width: 110, color: '#bdbdbd'}}/>
                    <Typography variant={'h4'}>Ошибка при загрузке объявлений</Typography>
                    <Button variant="outlined" onClick={() => {
                        getCards()
                    }}>Обновить страницу</Button>
                </Box>}

            {!isLoading && !error && filteredCards.length !== 0 && filteredCards.map((card, index) => {
                return <Card key={index} card={card}/>
            })}

            {!isLoading && !error && filteredCards.length === 0 && cards.length > 0 &&
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#bdbdbd',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                > <SearchOffRoundedIcon sx={{height: 110, width: 110, color: '#bdbdbd'}}/>
                    <Typography variant={'h4'}>Ничего не найдено</Typography>
                </Box>}
        </Box>
    )
}

export default CardsList;