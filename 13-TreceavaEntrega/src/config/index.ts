import dotenv from 'dotenv'

dotenv.config();
export default{
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'mongodb://localhost/CoderHouse',
    SECRET: process.env.SECRET || "none",
    CRYPTO_SECRET: process.env.CRYPTO_SECRET || "random",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "secret"
}