import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "playwright-core",
    "@sparticuz/chromium",
  ],

  outputFileTracingIncludes: {
    "/api/invoices/**": [
      "./node_modules/playwright-core/**",
    ],
  },
};

export default nextConfig;