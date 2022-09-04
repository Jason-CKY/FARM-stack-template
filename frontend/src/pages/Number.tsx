import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface INumberPageProps {}

export function NumberPage(props: INumberPageProps) {
    const [message, setMessage] = useState('');
    const { number } = useParams();

    useEffect(() => {
        if (number) {
            setMessage('The number is ' + number);
        } else {
            setMessage('Number is not set');
        }
    }, [number]);
    return (
        <div>
            <p>This is the number page.</p>
            <p>{message}</p>
        </div>
    );
}
