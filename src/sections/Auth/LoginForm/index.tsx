import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Form from "./Form";
import PasswordTextField from "./PasswordTextField";

const LoginForm = () => (
    <Form>
        <Stack spacing={0.5}>
            <TextField name="email" label="Email address" />

            <PasswordTextField />

            {/* {error ? <SoftAlert severity="error">{error}</SoftAlert> : null} */}
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
