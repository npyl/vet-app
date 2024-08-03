import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import PasswordTextField from "./PasswordTextField";
import Form from "./Form";

const LoginForm = () => (
    <Form>
        <Stack spacing={0.5}>
            <TextField name="email" label="Email address" />
            <PasswordTextField />
        </Stack>

        <Button
            sx={{
                mt: 5,
            }}
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
        >
            Login
        </Button>
    </Form>
);

export default LoginForm;
