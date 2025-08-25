import {Card as MaterialCard, CardContent, CardMedia, Typography} from '@mui/material';
import {type CardFromServer as CardType} from "../../types/card.ts"
import {Link} from "react-router-dom";
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';

type CardProps = {
    card: CardType
}

const Card = ({card}: CardProps) => {
    return (
        <Link to={`list/${card.id}`} style={{color: 'inherit', textDecoration: 'none'}}>
            <MaterialCard sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                padding: '0 10px',
                alignItems: 'center',
            }}>{card.image ?
                <CardMedia
                    component="img"
                    sx={{height: 100, width: 100, objectFit: 'cover', borderRadius: '10px'}}
                    image={card.image}
                    title={card.name}
                    alt={card.name}/> :
                <LocalSeeOutlinedIcon sx={{height: 110, width: 110, color: '#bdbdbd'}}/>}
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    flex: 1,
                    minWidth: 0
                }}>
                    <Typography variant="h5" component="div"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                        {card.name}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {card.location}
                    </Typography>
                    <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>
                        {card.type}
                    </Typography>
                </CardContent>
            </MaterialCard>
        </Link>

    )
}

export default Card;