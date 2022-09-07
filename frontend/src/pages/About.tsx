import * as React from 'react';
import NavigationBar from '../components/Navbar';

export interface IAboutPageProps {}

export function AboutPage(props: IAboutPageProps) {
    return (
        <div>
            <NavigationBar />
            <h1>This is the About Page</h1>
        </div>
    );
}
