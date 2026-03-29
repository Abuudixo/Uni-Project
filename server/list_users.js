import mongoose from 'mongoose';
import Patient from './models/Patient.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindbridge';

async function list() {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await Patient.find({}, 'email role');
        console.log('USERS:', JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}
list();
