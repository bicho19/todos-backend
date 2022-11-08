module.exports = {
    development: {
        dialect: "postgres",
        username: "wrkymysrndwxej",
        password: "82f4141a33563c1037d80c0726747aea5bcd7e85e2044d9dd59abc58c9d7bf1d",
        database: "d5cu57u4qfud06",
        host: "ec2-34-241-90-235.eu-west-1.compute.amazonaws.com",
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
    },
    staging: {
        dialect: "postgres",
        username: "wrkymysrndwxej",
        password: "82f4141a33563c1037d80c0726747aea5bcd7e85e2044d9dd59abc58c9d7bf1d",
        database: "d5cu57u4qfud06",
        host: "ec2-34-241-90-235.eu-west-1.compute.amazonaws.com",
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
    },
    production: {
        dialect: "postgres",
        username: "wrkymysrndwxej",
        password: "82f4141a33563c1037d80c0726747aea5bcd7e85e2044d9dd59abc58c9d7bf1d",
        database: "d5cu57u4qfud06",
        host: "ec2-34-241-90-235.eu-west-1.compute.amazonaws.com",
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        },
        logging: false
    }
}