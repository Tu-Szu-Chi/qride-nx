
export type DealerEntity = {
    id: string;
    name: string;
    owner_name: string;
    phone: string;
    bizType: DealerBizType; // Enum
    addressState: string;
    addressCity: string;
    addressDetail?: string;
    email?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    code?: string;
}

export enum DealerBizType {
    DEFAULT = 'DEFAULT'
}

export type ModelVO = {
    id: number;
    title: string;
}