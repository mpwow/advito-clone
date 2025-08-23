import { Link } from "react-router-dom";
import CardForm from "../../components/CardForm/CardForm.tsx";
import Button from "@mui/material/Button";
import {useCardStore} from "../../store/cardStore.ts";

type AddCardPageProps = {
    isEdit?: boolean;
}

const AddCardPage = ({isEdit}: AddCardPageProps) => {
    const { addCard, currentOpenedCard, editCard } = useCardStore();
    return (
        <>
            <Link to="/"><Button>Вернуться на главную</Button></Link>
            <CardForm onAddCard={addCard} initialData={currentOpenedCard} isEditing={isEdit} editCard={editCard}/>
        </>
    )
}

export default AddCardPage;