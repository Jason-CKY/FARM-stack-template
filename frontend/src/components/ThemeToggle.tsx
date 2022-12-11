import { Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { RiSunLine, RiMoonClearLine } from 'react-icons/ri';

interface IThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: IThemeToggleProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <div className={className}>
            <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                size="lg"
                onLabel={<RiSunLine color={theme.white} size={20} />}
                offLabel={<RiMoonClearLine color={theme.colors.gray[6]} size={20} />}
            />
        </div>
    );
}
