"use client";

// React
import { useState } from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Iconify
import Iconify from "@/components/iconify";

const PasswordTextField = () => {
    const [password, setPassword] = useState(false);

    return (
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
    );
};

export default PasswordTextField;
