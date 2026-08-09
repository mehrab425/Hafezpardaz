module.exports = {
  apps: [
    {
      name: "hafezpardaz",
      script: "node",
      args: ".next/standalone/server.js",
      cwd: "/home/USERNAME/domains/yourdomain.ir/public_html",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Set all env vars here (not in .env.local — it is NOT read in production)
        DATABASE_URL: "mysql://USER:PASS@localhost:3306/DB_NAME?connection_limit=5&pool_timeout=20",
        NEXTAUTH_SECRET: "your-secret-here",
        NEXTAUTH_URL: "https://yourdomain.ir",
        CLOUDINARY_CLOUD_NAME: "your_cloud_name",
        CLOUDINARY_API_KEY: "your_api_key",
        CLOUDINARY_API_SECRET: "your_api_secret",
      },
    },
  ],
};
