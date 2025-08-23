type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
import {type Card, type CardFromServer} from "../types/card.ts";

const API_URL = '/api';
const BASE_ENDPOINT = '/items';

export class CardApiClient {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    // Перегрузка метода - для обработки удаления карточки объявления
    private async request<T>(method: 'GET' | 'POST' | 'PUT', endpoint: string, data?: Card | CardFromServer): Promise<T>;
    private async request<T>(method: 'DELETE', endpoint: string, data?: Card | CardFromServer): Promise<void>;

    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        data?: Card | CardFromServer,
        initHeaders = {
            'Content-Type': 'application/json',
        }
    ): Promise<T | void> {
        const url = `${this.url}${endpoint}`;
        const options: RequestInit = {
            method,
            headers: initHeaders,
            body: (data && (method === 'POST' || method === 'PUT')) ? JSON.stringify(data) : null,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`${response.status} : ${response.statusText}`);
            }

            // ручка DELETE не возвращает ничего - обрабатываем это здесь
            if (options.method === 'DELETE') {
                return
            }

            return response.json();

        } catch (error) {
            throw new Error(`Request failed with ${error}`);
        }
    }

    getCards<T>(): Promise<T> {
        return this.request('GET', BASE_ENDPOINT)
    }

    getCard<T>(id: number): Promise<T> {
        return this.request('GET', `${BASE_ENDPOINT}/${id}`)
    }

    postCard<T>(data: Card): Promise<T> {
        return this.request('POST', `${BASE_ENDPOINT}`, data)
    }

    editCard<T>(id: number, data: CardFromServer): Promise<T> {
        return this.request('PUT', `${BASE_ENDPOINT}/${id}`, data)
    }

    deleteCard(id: number): Promise<void> {
        return this.request('DELETE', `${BASE_ENDPOINT}/${id}`)
    }
}

export const api = new CardApiClient(API_URL);