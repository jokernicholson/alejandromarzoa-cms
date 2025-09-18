module.exports = {
  apps: [
    {
      name: 'alejandromarzoa-cms',
      script: 'next',
      args: 'start',
      cwd: '/home/medina/apps/payload-cms',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      interpreter: '/home/medina/nodejs/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || '',
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://david_db_user:i7mMj2KkdrpbFuhf@cluster0.yz1fx5w.mongodb.net/alejandromarzoa?retryWrites=true&w=majority&appName=Cluster0',
        PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://alejandromarzoa.com',
        PAYLOAD_PUBLIC_SITE_URL: process.env.PAYLOAD_PUBLIC_SITE_URL || 'https://alejandromarzoa.com'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
