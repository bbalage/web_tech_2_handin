export interface AuthorSendDto {
    _id?: string,
    name: string,
    email: string,
    phoneNumber: string
}

export interface AuthorReceiveDto {
    _id: string,
    name: string,
    email: string,
    phoneNumber: string
}