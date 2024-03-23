module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: "detect", // Automatically detect the React version
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ["src/**/*.{ts,tsx}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
    },
};
