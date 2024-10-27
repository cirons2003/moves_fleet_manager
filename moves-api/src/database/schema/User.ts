type PrimaryKey = {
    id?: number;
};

type NonNullable = {
    email: string;
    password: string;
};

type Nullable = {
    tesla_access_token?: string;
    tesla_refresh_token?: string;
    timestamp?: any;
};

export type User = PrimaryKey & NonNullable & Nullable;
