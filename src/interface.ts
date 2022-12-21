export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface User {
    id: number,
    email: string, 
    password?:string,
    name: string,
    role: string
}

export interface Category {
    id: number,
    label: string
}

export interface Img {
    id: number,
    url: string, 
    publicId: string,
    bookId: number
}

export interface Book {
    id: number,
    title: string,
    author: string,
    date: string,
    page: number,
    price: number,
    description: string,
    categoryId?: number,
    category: Category,
    image: Img | null
}

export interface Cart {
    id: number,
    quantity: number,
    user: User,
    books: Book
}

export interface Bill {
    id: number,
    date: string,
    status: string,
    userId: number,
    listBooks?: string,
    userInfo?: string,
    listProducts: Array<Cart>,
    info: {
        name: string,
        tel: string,
        email: string,
        address: string
    }
}

export enum BillStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCEL = 'CANCEL'
}