import Search from "../Search/Search.tsx";
import Filters from "../Filters/Filters.tsx";
import Card from "../Card/Card.tsx";
import {useCardStore} from "../../store/cardStore.ts";
import {useEffect} from "react";

const CardsList = () => {
    const {cards, getCards, searchQuery, setSearchQuery, setFilterByCategory, filterByCategory} = useCardStore();

    useEffect(() => {
        getCards();
    }, [getCards]);

    const filteredCards = cards.filter(card => {
        const matchBySearch = card.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchByCategory = filterByCategory === '' || card.type === filterByCategory;
        return matchBySearch && matchByCategory;
    });

    return (
        <div className="list-container">
            <Search value={searchQuery} onChange={setSearchQuery} />
            <Filters onChange={setFilterByCategory} onDelete={() => setFilterByCategory('')} />
            {filteredCards.map((card, index) => {
                return <Card key={index} card={card}  />
            })}
        </div>
    )
}

export default CardsList;