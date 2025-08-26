import {useParams} from "react-router-dom";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";
import CardFullScreen from "../../components/CardFullScreen/CardFullScreen.tsx";
import {Box, Typography, Button} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';


const SingleCardPage = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const { currentOpenedCard,  getSingleCard, deleteCard, error, isLoading} = useCardStore();

    useEffect(()=>{
        if (cardId) {
            getSingleCard(Number(cardId));
        }
    }, [cardId]);

    return (
        <>
            {isLoading && !error && (
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
            )}

            {!isLoading && error !== 'Объявление не найдено' &&
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
                    <Typography variant={'h4'}>Ошибка при загрузке объявления</Typography>
                    <Button variant="outlined" onClick={() => {
                        getSingleCard(Number(cardId));
                        console.log(error)
                    }}>Обновить страницу</Button>
                </Box>}

            {!isLoading && error ==='Объявление не найдено' &&
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
                    <Typography variant={'h4'}>{error}</Typography>
                </Box>}


            {currentOpenedCard && !isLoading && !error  && <CardFullScreen currentOpenedCard={currentOpenedCard} onDeleteCard={deleteCard}/>}
        </>

    )
}

export default SingleCardPage;