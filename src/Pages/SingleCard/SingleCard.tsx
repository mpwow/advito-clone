import {useParams} from "react-router-dom";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";
import CardFullScreen from "../../components/CardFullScreen/CardFullScreen.tsx";

const SingleCardPage = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const { currentOpenedCard,  getSingleCard, deleteCard} = useCardStore();

    useEffect(()=>{
        if (cardId) {
            getSingleCard(Number(cardId));
        }
    }, [cardId]);

    if (currentOpenedCard) {
        return (
            <>
                <CardFullScreen currentOpenedCard={currentOpenedCard} onDeleteCard={deleteCard}/>
            </>

        )
    }
}

export default SingleCardPage;