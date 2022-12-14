import { Button, ButtonProps } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import { AiFillGitlab } from 'react-icons/ai';

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return <Button component="a" leftIcon={<GithubIcon size={16} />} variant="default" {...props} />;
}

export function GitlabButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return <Button component="a" leftIcon={<AiFillGitlab size={16} />} variant="default" {...props} />;
}
