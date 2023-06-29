/** @type {import('next').NextConfig} */
const withImages = require('next-images')
module.exports = {
  ...withImages(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}
