type PrimaryKey = {
    id?: number;
};

type NonNullable = {
    user_id: number; // Foreign key
    key_paired: boolean;
};

type Nullable = {
    vin: string;
};

export type User = PrimaryKey & NonNullable & Nullable;
