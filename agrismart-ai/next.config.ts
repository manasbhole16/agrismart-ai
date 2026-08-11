import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Extra origins allowed to request the dev server (e.g. when developing
  // behind a container/VM where the browser origin differs from localhost).
  allowedDevOrigins: ["127.0.2.2", "localhost:3000", "localhost:3001"],
};

export default nextConfig;
