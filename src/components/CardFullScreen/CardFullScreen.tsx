import {Link} from "react-router-dom";
import {Typography, CardMedia} from '@mui/material';
import Button from "@mui/material/Button";
import type {CardFromServer as CardType} from "../../types/card.ts";
import Container from '@mui/material/Container';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';


type CardProps = {
    currentOpenedCard: CardType,
    onDeleteCard: (id: number) => void,
}

const CardFullScreen = ({currentOpenedCard, onDeleteCard}: CardProps) => {
    {
        return (
            <>
                <Container sx={{display: 'flex', flexDirection: 'column', padding: '1rem'}}>
                    <Container>
                        <Typography variant="h4" gutterBottom>
                            {currentOpenedCard.name}
                        </Typography>
                        {currentOpenedCard.image ?
                            <CardMedia
                                component="img"
                                sx={{height: 100, width: 100, objectFit: 'cover', borderRadius: '10px'}}
                                image={currentOpenedCard.image}
                                title={currentOpenedCard.name}
                                alt={currentOpenedCard.name}/> :
                            <LocalSeeOutlinedIcon sx={{height: 110, width: 110, color: '#bdbdbd'}}/>}
                    </Container>
                    <Container>
                        <Typography variant="h5">
                            {currentOpenedCard.location}
                        </Typography>
                        <Typography variant="h6">
                            Описание
                        </Typography>
                        <Typography variant="body1">
                            {currentOpenedCard.description}
                        </Typography>
                        {currentOpenedCard.type === "Недвижимость" && (
                            <>
                                <Typography variant="h6">
                                    Тип недвижимости
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.propertyType}
                                </Typography>
                                <Typography variant="h6">
                                    Площадь
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.area} м²
                                </Typography>
                                <Typography variant="h6">
                                    Кол-во комнат
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.rooms}
                                </Typography>
                                <Typography variant="h6">
                                    Цена
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.price} ₽
                                </Typography>
                            </>
                        )}

                        {currentOpenedCard.type === "Авто" && (
                            <>
                                <Typography variant="h6">
                                    Марка
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.brand}
                                </Typography>
                                <Typography variant="h6">
                                    Модель
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.model}
                                </Typography>
                                <Typography variant="h6">
                                    Год выпуска
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.year}
                                </Typography>
                                <Typography variant="h6">
                                    Пробег
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.mileage}
                                </Typography>
                            </>
                        )}

                        {currentOpenedCard.type === "Услуги" && (
                            <>
                                <Typography variant="h6">
                                    Тип услуги
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.serviceType}
                                </Typography>
                                <Typography variant="h6">
                                    Опыт работы
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.experience}
                                </Typography>
                                <Typography variant="h6">
                                    Стоимость
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.cost}
                                </Typography>
                                <Typography variant="h6">
                                    График работы
                                </Typography>
                                <Typography variant="body2">
                                    {currentOpenedCard.workSchedule}
                                </Typography>
                            </>
                        )}

                    </Container>
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        gap: '1rem'
                    }}>
                        <Link to={`/edit-card/${currentOpenedCard.id}`}>
                            <Button sx={{width: '150px'}} onClick={() => {
                            }} variant="contained">
                                Редактировать
                            </Button>
                        </Link>
                        <Link to={`/`}>
                            <Button sx={{width: '150px'}} color="error" onClick={() => (onDeleteCard(currentOpenedCard?.id))}
                                    variant="contained">
                                Удалить
                            </Button>
                        </Link>
                    </Container>
                </Container>
            </>

        )
    }
}

export default CardFullScreen;