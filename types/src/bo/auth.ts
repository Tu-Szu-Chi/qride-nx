export enum Role {
 ADMIN = 'admin'
}

export type BoUser = {
    username: string
    id: string
    role: Role
}