module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8082',
    },
    {
      name: 'app2',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8083',
    },
    {
      name: 'app3',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8084',
    },
    {
      name: 'app4',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=8085',
    }
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker'],
    // },
  ],
}
