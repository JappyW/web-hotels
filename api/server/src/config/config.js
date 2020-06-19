require("dotenv").config()

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    // DB NAME HERE
    database: "studios",
    username: "postgres",
    password: "root",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: false
    },
    secret:
      "53ddf1277aa9cce7f64fd176d566553322a86c139047a1d9c7a8e09c2500029ba167c9efba48fe49e9c81308f4d3c03c64016ad05478b3785432aea52ab5043a",
    email: {
      password: "qwertypass123"
    },
    JWT_SECRET: "codeworkrauthentication",
    oauth: {
      google: {
        clientID: "number",
        clientSecret: "string"
      },
      facebook: {
        clientID: "number",
        clientSecret: "string"
      }
    }
  },

  test: {
    database: "hotels",
    username: "postgres",
    password: "root",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: false
    },
    secret:
      "53ddf1277aa9cce7f64fd176d566553322a86c139047a1d9c7a8e09c2500029ba167c9efba48fe49e9c81308f4d3c03c64016ad05478b3785432aea52ab5043a",
    email: {
      password: "qwertypass123"
    },
    JWT_SECRET: "codeworkrauthentication",
    oauth: {
      google: {
        clientID: "number",
        clientSecret: "string"
      },
      facebook: {
        clientID: "number",
        clientSecret: "string"
      }
    },
    payment: {
      publicKey: "sandbox_i94844202303",
      privateKey: "sandbox_zNKLVYoBd2fmKpwKWpPCPKfrv79mRvbmpuSChC1i"
    }
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
    define: {
      timestamps: false
    },
    secret:
      "53ddf1277aa9cce7f64fd176d566553322a86c139047a1d9c7a8e09c2500029ba167c9efba48fe49e9c81308f4d3c03c64016ad05478b3785432aea52ab5043a",
    email: {
      password: "qwertypass123"
    },
    EMAIL:
    {
      user: "webuihotelsearch@gmail.com",
      password: "qwertypass321"
    },
    JWT_SECRET: "codeworkrauthentication",
    oauth: {
      google: {
        clientID: "number",
        clientSecret: "string"
      },
      facebook: {
        clientID: "number",
        clientSecret: "string"
      }
    },
    payment: {
      publicKey: "sandbox_i94844202303",
      privateKey: "sandbox_zNKLVYoBd2fmKpwKWpPCPKfrv79mRvbmpuSChC1i"
    }
  }
}
