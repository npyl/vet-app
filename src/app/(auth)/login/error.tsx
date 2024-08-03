"use client";

import LoginContent from "@/sections/Login";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    return <LoginContent error={error?.message} />;
}
