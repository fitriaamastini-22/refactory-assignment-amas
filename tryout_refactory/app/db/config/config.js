require('dotenv').config(); // this is important!

module.exports ={
  "development": {
    "username": process.env.DB_USER_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_DB_NAME_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": "mysql",
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
  },
  "test": {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "mysql",
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
  }
}