/**
 * PM2 example for hosting that uses the Next.js standalone server.
 * Do NOT point script at a legacy Express `src/server.js` — that app is not this project.
 * Replace placeholders; never commit real secrets.
 */
module.exports = {
  apps: [
    {
      name: "hafezpardaz",
      script: "server.js",
      cwd: "/home/USERNAME/domains/yourdomain.ir/public_html",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Set all env vars in the host panel (ParsPack) when possible
        DATABASE_URL: "file:./prisma/data.db",
        AUTH_SECRET: "replace-with-long-random-secret",
        NEXTAUTH_SECRET: "replace-with-long-random-secret",
        AUTH_URL: "https://yourdomain.ir",
        NEXTAUTH_URL: "https://yourdomain.ir",
        CLOUDINARY_CLOUD_NAME: "your_cloud_name",
        CLOUDINARY_API_KEY: "your_api_key",
        CLOUDINARY_API_SECRET: "your_api_secret",
      },
    },
  ],
};
