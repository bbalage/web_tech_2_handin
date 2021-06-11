export interface BookReceiveDto {
    _id: string,
    title: string,
    dateOfPublish: Date,
    price: number,
    copiesCreated: number,
    copiesSold: number,
    description: string,
    genres: string[],
    reviews: number
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