import React from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';

interface ILandingPage {
    type: 'login' | 'register';
}

export default function LandingPage({ type }: ILandingPage) {
    return (
        <div className="vh-100 flex items-center justify-center">
            <div className="w-[50%] h-[50%]">
                <AuthenticationForm type={type} />
            </div>
        </div>
    );
}
