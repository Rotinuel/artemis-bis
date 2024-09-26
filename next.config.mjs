/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gejdspomlltjjlnotkju.supabase.co',
            },
        ],
    }, 
};

export default nextConfig;
