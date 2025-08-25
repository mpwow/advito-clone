type CardType = "Недвижимость" | "Авто" | "Услуги"

export interface BaseCard {
    name: string;
    description: string;
    location: string;
    image?: string;
    type: CardType;
}

export interface RealtyCard extends BaseCard {
    type: "Недвижимость";
    propertyType: string;
    area: number;
    rooms: number;
    price: number;
}

export interface CarCard extends BaseCard {
    type: "Авто";
    brand: string;
    model: string;
    year: number;
    mileage?: number;
}

export interface ServiceCard extends BaseCard {
    type: "Услуги";
    serviceType: string;
    experience: number;
    cost: number;
    workSchedule?: string;
}

export type Card = RealtyCard | CarCard | ServiceCard;

export type CardFromServer = Card & {
    id: number;
}

