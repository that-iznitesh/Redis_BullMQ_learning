import {Queue } from "bullmq";

const productQueue = new Queue ("productQueue", {
    connection: {
        // host: process.env.REDIS_HOST,
        // port: process.env.REDIS_PORT,
        // password: process.env.REDIS_PASSWORD,
        host: "localhost",
        port: 6379,
    },
});

export default productQueue;