import styles from './Card.module.scss';
import {Card as MaterialCard, CardActions, CardContent, CardMedia, Typography, Button} from '@mui/material';
import {type CardFromServer as CardType} from "../../types/card.ts"
import {Link} from "react-router-dom";

type CardProps = {
    card : CardType
}

const Card = ({card} : CardProps) => {

    const imageUrl = card.image ? card.image : 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'

    return  (
        <MaterialCard sx={{padding:'10px'}} className={styles.cardContainer}>
            <CardMedia className={styles.cardImageContent}>
                <img className={styles.image} src={imageUrl} alt=""/>
            </CardMedia>
            <CardContent sx={{padding:0}} className={styles.cardTextContent}>
                <Typography noWrap variant="h3">{card.name}</Typography>
                <Typography variant="h6">{card.location}</Typography>
                <Typography variant="subtitle1">{card.type}</Typography>
            </CardContent>
            <CardActions sx={{padding:0}} className={styles.cardActions}>
                <Link to={`list/${card.id}`} className={styles.cardLink}>
                    <Button variant="contained" className={styles.cardActionsButton}>Открыть</Button>
                </Link>
            </CardActions>
        </MaterialCard>

    )
}

export default Card;