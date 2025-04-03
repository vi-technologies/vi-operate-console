export default {
  output: "standalone",
  images: {
    domains: [
      "transform.vi.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "staging-ge-api.transform.vi.co",
      },
    ],
  },
  // ignore lint build errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/console/dashboards",
        permanent: true,
      },
    ];
  },
};
