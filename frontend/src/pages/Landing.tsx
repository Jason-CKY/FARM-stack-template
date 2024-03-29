import React from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';

interface ILandingPage {
    type: 'login' | 'register';
}

export default function LandingPage({ type }: ILandingPage) {
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-[50%] mt-10 justify-center">
                <AuthenticationForm type={type} />
            </div>
        </div>
    );
}
