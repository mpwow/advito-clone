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
    isLoading: boolean,
    error: string | null,
}

export const useCardStore = create<CardStore>((set) => ({
    cards: [],
    searchQuery: '',
    filterByCategory: '',
    isLoading: false,
    error: null,
    currentOpenedCard: null,

    setSearchQuery: (query) =>
        set({searchQuery: query}),

    setFilterByCategory: (filterByCategory) =>
        set({filterByCategory: filterByCategory}),

    getCards: async () => {
        set({isLoading: true, error: null});
        try {
            const cardsFromRemote = await api.getCards<CardFromServer[]>();
            set({cards: cardsFromRemote});
        } catch (error) {
            set({error: (error as Error).message || 'Unknown error'});
        } finally {
            set({isLoading: false});
        }
    },

    getSingleCard: async (cardId: number) => {
        set({isLoading: true, error: null});
        try {
            const cardsFromRemote: CardFromServer = await api.getCard(cardId);
            set({currentOpenedCard: cardsFromRemote});
        } catch (error) {
            if ((error as Error).message === '404') {
                set({error: 'Объявление не найдено'});
            } else {
                set({error: (error as Error).message || 'Unknown error'});
            }
        } finally {
            set({isLoading: false});
        }
    },

    addCard: async (card: Card) => {
        set({isLoading: true, error: null});
        try {
            const newCard: CardFromServer = await api.postCard(card)
            set((state) => ({cards: [...state.cards, newCard]}));
        } catch (error) {
            set({error: (error as Error).message || 'Unknown error'});
        } finally {
            set({isLoading: false});
        }
    },

    editCard: async (card: CardFromServer) => {
        set({isLoading: true, error: null});
        try {
            const updatedCard: CardFromServer = await api.editCard(card.id, card);
            set((state) => ({
                cards: state.cards.map(card => card.id === updatedCard.id ? updatedCard : card),
                currentOpenedCard: updatedCard,
            }));
        } catch (error) {
            set({error: (error as Error).message || 'Unknown error'});
        } finally {
            set({isLoading: false});
        }

    },

    deleteCard: async (cardId: number) => {
        set({isLoading: true, error: null});
        try {
            await api.deleteCard(cardId);
            set((state) => ({
                cards: state.cards.filter(card => card.id !== cardId),
            }))
        } catch (error) {
            set({error: (error as Error).message || 'Unknown error'});
        } finally {
            set({isLoading: false});
        }
    },
}))