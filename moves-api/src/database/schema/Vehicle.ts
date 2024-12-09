export type Vehicle = {
    id?: number;
    vin: string;
    user_id: number; // Foreign key
    key_paired: boolean;
};
