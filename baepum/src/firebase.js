import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCRU_Y3NjfiDhlZZtIYrMhJ7OcR-aMiPMY",
    authDomain: "baepum-2c183.firebaseapp.com",
    projectId: "baepum-2c183",
    storageBucket: "baepum-2c183.firebasestorage.app",
    messagingSenderId: "427055961601",
    appId: "1:427055961601:web:3a7fece19250ceef1c9200",
    measurementId: "G-8V3K705BV8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };