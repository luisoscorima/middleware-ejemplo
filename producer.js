const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');
async function enviarMensaje(req, res, next) {
  let connection;

  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'mi_cola';

    await channel.assertQueue(queue, { durable: true, autoDelete: false });
    console.info('Conexión a RabbitMQ establecida y cola verificada.');

    const messageId = uuidv4();
    const message = JSON.stringify({ id: messageId, data: req.body });

    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.info(`Mensaje enviado a la cola con ID: ${messageId}`);
    res.status(200).json({ message: 'Mensaje enviado a la cola', id: messageId });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = enviarMensaje;