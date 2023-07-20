const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      swcMinify: true,
    env: {
        REACT_APP_DISABLE_WARNINGS: 1,
    },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        return config;
    },
};

const sentryWebpackPluginOptions = {
    silent: true, // Suppresses all logs
    hideSourcemaps: true,
};

/** 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
    env: {
        NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
    },
});
*/
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
//module.exports = nextConfig;
