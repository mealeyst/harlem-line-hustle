/** @type {import('next').NextConfig} */
const withImages = require('next-images')
module.exports = {
  ...withImages(),
  images: {
    layoutRaw: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}
