/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
    additionalData: `@import "./styles/_fonts.scss", "./styles/_helpers.scss", "./styles/_sizes.scss";`,
  },
  webpack: (config) => {
    // Add file loader for audio files
    config.module.rules.push(
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['url-loader'],
      },
    );

    return config;
  },
};

export default nextConfig;
