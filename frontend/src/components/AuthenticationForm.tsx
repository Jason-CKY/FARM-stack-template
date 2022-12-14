import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Divider, Checkbox, Anchor, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface IAuthenticationForm {
    paperProps?: PaperProps;
    type: string;
}
export function AuthenticationForm({ paperProps, type }: IAuthenticationForm) {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
        }
    });

    return (
        <Paper radius="md" p="xl" withBorder {...paperProps}>
            <Text size="lg" weight={500}>
                Welcome to Mantine, {type} with email
            </Text>

            <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                    {type === 'register' && (
                        <>
                            <TextInput required label="First Name" placeholder="Your first name" value={form.values.name} onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />
                            <TextInput required label="Last Name" placeholder="Your last name" value={form.values.name} onChange={(event) => form.setFieldValue('name', event.currentTarget.value)} />
                        </>
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                    />

                    {type === 'register' && (
                        <PasswordInput
                            required
                            label="Confirm Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor component="button" type="button" color="dimmed" onClick={() => (type === 'register' ? navigate('/login') : navigate('/register'))} size="xs">
                        {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </Paper>
    );
}
