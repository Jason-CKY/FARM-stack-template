import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export interface ILoadingSpinnerProps {}

export function LoadingSpinner(props: ILoadingSpinnerProps) {
    return <ThreeDots height="100" width="100" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" wrapperClass="spinner position-absolute top-50 start-50" visible={true} />;
}
