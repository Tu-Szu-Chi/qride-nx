export type ProductEntity = {
    id: string;  // Vehicle Registration ID
    user_id: string;
    vin: string;
    engine_number: string;
    purchase_date: string;
    registration_date: string;
    dealer_name: string;
    year: number;
    model: string; // mapping to DB
}

export type ProductVO = ProductEntity & {
    img?: string;
} 

export type ProductDto = Omit<ProductEntity, 'user_id' >

export type ProductUpdateDto =  {
    id: string,
    data: Partial<Pick<ProductEntity, 'year' | 'vin' | 'engine_number' | 'purchase_date' | 'registration_date' | 'dealer_name'>>
}

export type ProductRemoveDto = {
    id: string
}