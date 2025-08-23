import styles from './SingleCard.module.scss';
import {Link, useParams} from "react-router-dom";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";
import {Typography, Box, CardMedia} from '@mui/material';
import Button from "@mui/material/Button";

const SingleCardPage = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const { currentOpenedCard,  getSingleCard, deleteCard} = useCardStore();

    useEffect(()=>{
        if (cardId) {
            getSingleCard(cardId);
        }
    }, [cardId]);

    if (currentOpenedCard) {
        return (
            <>
                <Link to="/"><Button>Вернуться на главную</Button></Link>
                <Box className={styles.singleCardContainer}>
                    <CardMedia className={styles.cardImageContent}>
                        <img src={currentOpenedCard.image ? currentOpenedCard.image : 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'} alt=""/>
                    </CardMedia>
                    <Typography variant="h3" gutterBottom>
                        {currentOpenedCard.name}
                    </Typography>
                    <Typography variant="h6">
                        {currentOpenedCard.location}
                    </Typography>
                    <Typography variant="body1">
                        {currentOpenedCard.description}
                    </Typography>
                    <Link to={`/edit-card/${currentOpenedCard.id}`}>
                        <Button className={styles.addButton} onClick={()=>{}} variant="contained">
                            Редактировать
                        </Button>
                    </Link>
                    <Link to={`/`}>
                        <Button className={styles.addButton} onClick={()=>(deleteCard(currentOpenedCard?.id))} variant="contained">
                            Удалить объявление
                        </Button>
                    </Link>
                </Box>
            </>

        )
    }
}

export default SingleCardPage;