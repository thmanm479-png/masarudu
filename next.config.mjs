/** @type {import('next').NextConfig} - Rebuild v3 */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'triwrtqolnqkfempwlqz.supabase.co'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'triwrtqolnqkfempwlqz.supabase.co',
            },
        ],
    },
};

export default nextConfig;
