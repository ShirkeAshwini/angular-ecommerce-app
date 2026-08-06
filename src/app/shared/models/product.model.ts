export interface Product {
    Id: number;

    Name: string;

    Price: number;

    Description: string;

    ImageUrl: string;
    
    Category: string;

    Quantity?: number;

    Rating?: number;


    Stock?: number;
    
    CreatedAt?: Date;
}