import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './token-manager/routes';

dotenv.config();

const redis = require('redis');
export const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});
redisClient.on('error', (err: any) => console.error('Redis Client Error', err));

const initializeRedisConnection = async () => {
    await redisClient.connect();
};
initializeRedisConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(mainRouter);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
