/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
    additionalData: `@import "./styles/_fonts.scss", "./styles/_helpers.scss", "./styles/_sizes.scss";`,
  },
  webpack: {
    module: {
      rules: [
        {
          test: /\.svga$/i,
          use: 'url-loader',
        },
      ],
    },
  },
};

export default nextConfig;
