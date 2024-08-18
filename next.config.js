// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    serverActions: {
        bodySizeLimit: "4mb",
    },
};

module.exports = nextConfig;
