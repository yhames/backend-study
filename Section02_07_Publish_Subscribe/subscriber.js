/**
 * This script receives a message from the RabbitMQ server.
 * 
 * 2개 이상의 subscriber를 실행하고, publisher를 실행하면,
 * topic을 받지 못한 subscriber는 메시지를 받기 위해 대기합니다.
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
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`);
            if (input.number == 7)
                channel.ack(message);
        })
        console.log("Waiting for messages...");
    } catch (ex) {
        console.error(ex);
    }
}