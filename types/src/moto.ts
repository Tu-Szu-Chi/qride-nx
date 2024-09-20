
export type DealerEntity = {
    id: string;
    name: string;
    owner_name: string;
    phone: string;
    biz_type: DealerBizType; // Enum
    address_state: string;
    address_city: string;
    address_detail?: string;
    email?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    code?: string;
}

export enum DealerBizType {
    DEFAULT = 'DEFAULT'
}