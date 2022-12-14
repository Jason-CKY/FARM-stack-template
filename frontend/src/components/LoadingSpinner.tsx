import React from 'react';
import { Loader } from '@mantine/core';

export interface ILoadingSpinnerProps {}

export function LoadingSpinner(props: ILoadingSpinnerProps) {
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <Loader size={100} />
        </div>
    );
}
