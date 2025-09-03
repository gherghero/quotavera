/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // per test su tunnel HTTPS lascia false; su plain LAN (http) i SW non si attivano comunque
  disable: false
});
module.exports = withPWA({
  reactStrictMode: true
});
