/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
    additionalData: `@import "./styles/_fonts.scss", "./styles/_helpers.scss", "./styles/_sizes.scss";`,
  },
};

export default nextConfig;
