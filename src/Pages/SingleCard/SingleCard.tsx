import {useParams} from "react-router-dom";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";
import CardFullScreen from "../../components/CardFullScreen/CardFullScreen.tsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";
import Error from "../../components/Error/Error";


const SingleCardPage = () => {
    const {cardId} = useParams<{ cardId: string }>();
    const {currentOpenedCard, getSingleCard, deleteCard, error, isLoading} = useCardStore();

    useEffect(() => {
        if (cardId) {
            getSingleCard(Number(cardId));
        }
    }, [cardId]);

    return (
        <>
            {isLoading && !error && (
                <LoadingSpinner/>
            )}

            {!isLoading && error === 'Объявление не найдено' &&
                <Error errorMessage="Ошибка при загрузке объявления" retryFn={() => {
                    getSingleCard(Number(cardId))
                }}/>}


            {currentOpenedCard && !isLoading && !error &&
                <CardFullScreen currentOpenedCard={currentOpenedCard} onDeleteCard={deleteCard}/>}
        </>

    )
}

export default SingleCardPage;