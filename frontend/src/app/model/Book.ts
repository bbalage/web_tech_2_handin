export interface BookReceiveDto {
    _id: string,
    title: string,
    dateOfPublish: Date,
    price: number,
    copiesCreated: number,
    copiesSold: number,
    description: string,
    genres: string[],
    authors: string
}

export interface BookSendDto {
    _id?: string,
    title: string,
    dateOfPublish: Date,
    price: number,
    copiesCreated: number,
    copiesSold: number,
    description: string,
    genres: string[]
}

export enum Genres {
    HORROR = "Horror", THRILLER = "Thriller", ACTION = "Action", FANTASY = "Fantasy",
    ROMANTIC = "Romantic", SCIFI = "Science fiction", HISTORICAL = "Historical",
    YOUNG_ADULT = "Young adult"
}

export interface GenreCheckBox {
    genre: string,
    chosen: boolean
}