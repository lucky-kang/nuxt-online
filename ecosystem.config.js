module.exports = {
	apps: [
		{
			name: "frisson_web",
			exec_mode: "cluster",
			script: "./node_modules/nuxt/bin/nuxt.js",
			args: "start",
			watch: false,
			instances: 'max', // Or a number of instances
			autorestart: true,
			error_file: "./logs/app-err.log",
			log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      append_env_to_name: true,
			max_memory_restart: "1G",
			env: {
				NODE_ENV: "production",
				NODE_MODE: "prod",
				PORT: "3001",
				HOST: "0.0.0.0"
			},
			env_production: {
				NODE_ENV: "production",
				NODE_MODE: "prod",
				PORT: "3001",
				HOST: "0.0.0.0"
			},
			env_staging: {
				NODE_ENV: "production",
				NODE_MODE: "staging",
				PORT: "3001",
				HOST: "0.0.0.0"
			},
			env_test: {
				NODE_ENV: "production",
				NODE_MODE: "test",
				PORT: "3001",
				HOST: "0.0.0.0"
			}
		}
	]
};
