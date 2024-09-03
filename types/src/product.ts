export type ProductEntity = {
    id: string;
    user_id: string;
    vin: string;
    engine_number: string;
    purchase_date: Date;
    registration_date: Date;
    dealer_name: string;
    model: string; // mapping to DB
}

export type ProductVO = ProductEntity & {
    img?: string;
} 