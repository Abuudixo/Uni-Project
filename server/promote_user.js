import mongoose from 'mongoose';
import Patient from './models/Patient.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mindbridge';

async function createOrPromote() {
    try {
        await mongoose.connect(MONGO_URI);
        const email = 'abdallabile2@gmil.com';
        const password = '123456';
        
        // Find or create
        let user = await Patient.findOne({ email });
        
        if (user) {
            user.role = 'doctor';
            await user.save();
            console.log(`SUCCESS: Existing user ${email} promoted to doctor.`);
        } else {
            user = new Patient({
                email,
                password, // Note: currently plain text as per project state
                role: 'doctor',
                firstName: 'Abdalla',
                lastName: 'Bile',
                dob: '1990-01-01', // Default
                phone: '',
                pronouns: '',
                diagnoses: [],
                medications: '',
                allergies: '',
                notes: '',
                consentTreatment: true,
                consentData: true,
                consentContact: true
            });
            await user.save();
            console.log(`SUCCESS: New user ${email} created with doctor role.`);
        }
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}
createOrPromote();
