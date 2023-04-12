const nextConfig = {
  reactStrictMode: true,
  env: {
    // url: "http://ec2-52-3-250-20.compute-1.amazonaws.com/",
    url: "http://localhost:80/",
  },
  images: {
    domains: ['localhost'],
  },
  devIndicators: {
    buildActivity: false
}
};

module.exports = nextConfig;
