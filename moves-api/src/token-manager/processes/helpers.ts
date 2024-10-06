import { decode } from 'jsonwebtoken';

export const extractUserId = (id_token: string) => {
    const decodedIdToken = decode(id_token);
    const userId =
        (decodedIdToken?.sub as string) !== undefined
            ? (decodedIdToken?.sub as string)
            : undefined;
    return userId;
};

export const authorizeRequest = (
    config: { [key: string]: any },
    authToken: string,
) => {
    const authorizedConfig = { ...config };
    const header = authorizedConfig.header ?? {};
    header.Authorization = `Bearer ${authToken}`;
    authorizedConfig.header = header;
    return authorizedConfig;
};
