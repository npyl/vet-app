import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Controller, useFormContext } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "@/components/iconify";
import { ChangeEvent, useCallback, useRef } from "react";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: "50px",
    height: "50px",
    border: "3px solid transparent",
    cursor: "pointer",
    transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.short,
    }),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.75),
        borderColor: theme.palette.primary.main,
    },
}));

interface Props {
    name: string;
}

const RHFUploadPhoto = ({ name }: Props) => {
    const { control, setValue } = useFormContext();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onAvatarClick = useCallback(() => fileInputRef.current?.click(), []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        // INFO: convert to base64 and then setValue()
        if (file) {
            const reader = new FileReader();
            // Set Handler
            reader.onloadend = () => {
                // The result attribute contains the data as a base64 encoded string.
                const base64String = reader.result as string;
                setValue(name, base64String);
            };
            // Start conversion
            reader.readAsDataURL(file);
        }
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    {/* Invisible Input Element */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleChange}
                        style={{ display: "none" }}
                        accept="image/*" // Restrict file input to images only
                    />

                    {/* Avatar */}
                    <Stack
                        justifyContent="center"
                        position="relative"
                        onClick={onAvatarClick}
                    >
                        <StyledAvatar
                            sx={{
                                width: "150px",
                                height: "150px",
                            }}
                            src={field.value}
                        />

                        <Iconify
                            icon="gridicons:add"
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                height: "30px",
                                width: "30px",
                                backgroundColor: "white",
                                borderRadius: "15px",
                            }}
                        />
                    </Stack>

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </>
            )}
        />
    );
};

export default RHFUploadPhoto;
