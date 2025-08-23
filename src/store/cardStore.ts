import {create} from 'zustand';
import {type Card, type CardFromServer} from "../types/card.ts"
import {api} from "../api/cardApiClient.ts";

type CardStore = {
    cards: CardFromServer[],
    currentOpenedCard: CardFromServer | null,
    getCards: () => void,
    getSingleCard: (cardId: number) => void,
    addCard: (card: Card) => void,
    editCard: (card: CardFromServer) => void,
    deleteCard: (cardId: number) => void,
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void,
    filterByCategory: string,
    setFilterByCategory: (filterByCategory: string) => void,
}

export const useCardStore = create<CardStore>((set) => ({
    cards: [],

    searchQuery: '',

    filterByCategory: '',

    currentOpenedCard: null,

    setSearchQuery: (query) =>
        set({searchQuery: query}),

    setFilterByCategory: (filterByCategory) =>
        set({filterByCategory: filterByCategory}),

    getCards: async () => {
        const cardsFromRemote: CardFromServer[] = await api.getCards();
        set({cards: cardsFromRemote});
    },

    getSingleCard: async (cardId: number) => {
        const cardsFromRemote: CardFromServer = await api.getCard(cardId);
        set({currentOpenedCard: cardsFromRemote});
    },

    addCard: async (card: Card) => {
        const newCard: CardFromServer = await api.postCard(card)
        set((state) => ({cards: [...state.cards, newCard]}));
    },

    editCard: async (card: CardFromServer) => {
        const updatedCard: CardFromServer = await api.editCard(card.id, card);
        set((state) => ({
            cards: state.cards.map(card => card.id === updatedCard.id ? updatedCard : card),
            currentOpenedCard: updatedCard,
        }));
    },

    deleteCard: async (cardId: number) => {
        await api.deleteCard(cardId);
        set((state) => ({
            cards: state.cards.filter(card => card.id !== cardId),
        }))
    },
}))