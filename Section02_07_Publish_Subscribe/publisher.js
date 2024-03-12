/**
 * This script sends a message to the RabbitMQ server.
 */
const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const msg = {number: process.argv[2]};
connect();
async function connect() {
    try {
        const amqpServer = process.env.RABBITMQ_URI || "amqp://localhost";
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    } catch (ex) {
        console.error(ex);
    }
}