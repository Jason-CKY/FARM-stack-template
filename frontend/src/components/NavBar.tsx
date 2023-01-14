import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStyles, Header, Button, Text } from '@mantine/core';
import Logo from '../assets/logo.svg';
import { ThemeToggle } from './ThemeToggle';
import { AuthContext } from './RequireAuth';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
        display: 'flex'
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

export function NavBar() {
    const { classes } = useStyles();
    const user = useContext(AuthContext);
    let username = '';
    if (!!user.firstName && !!user.lastName) {
        username = `${user.firstName} ${user.lastName}`;
    } else {
        username = user.email;
    }
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/logout');
    };
    return (
        <Header height={HEADER_HEIGHT} className={classes.header}>
            <div className="flex justify-between w-full">
                <img
                    src={Logo}
                    alt=""
                    className="rounded-full mx-2 hover:cursor-pointer w-[4rem]"
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <div className="flex items-center">
                    {!!user.id && (
                        <div className="flex items-center">
                            <Text c="dimmed">Welcome, {username}</Text>
                            <Button className="m-3" variant="default" color="gray" radius="lg" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                    )}
                    <ThemeToggle className="mx-5" />
                </div>
            </div>
        </Header>
    );
}
