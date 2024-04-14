import Iconify from "@/components/iconify";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const Page1 = () => {
    // const [errorMsg, setErrorMsg] = useState("");
    const [password, setPassword] = useState(false);

    return (
        <>
            <TextField name="email" label="Email address" />

            <TextField
                name="password"
                label="Password"
                type={password ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setPassword((old) => !old)}
                                edge="end"
                            >
                                <Iconify
                                    icon={
                                        password
                                            ? "solar:eye-bold"
                                            : "solar:eye-closed-bold"
                                    }
                                />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
};

export default Page1;
