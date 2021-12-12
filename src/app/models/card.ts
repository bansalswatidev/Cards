export interface Card {
    //id : number;
    //type : CardType;
    description : string;
}

export enum CardType {
    great = 'GREAT',
    awful = 'AWFUL',
    advice = 'ADVICE'
}