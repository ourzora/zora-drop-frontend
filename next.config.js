// const withTM = require('next-transpile-modules')(['three'])

module.exports = {
  // reactStrictMode: true,
  // experimental: { outputFileTracing: true },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|bin)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    });
    config.module.rules.push({
      test: /\.(md|txt)$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      test: /\.obj$/,
      loader: 'webpack-obj-loader'
    });
    config.module.rules.push({
      test: /\.(gltf)$/,
      use: [
        {
          loader: "gltf-webpack-loader"
        }
      ]
    })
    return config;
  },
  future: {
    webpack5: false,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/placeholder-nft/metadata.json',
          has: [
            {
              type: 'query',
              key: 'id',
              value: '(?<tokenId>.*)',
            },
          ],
          destination: '/api/metadata/:tokenId',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
