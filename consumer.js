const amqp = require('amqplib');

async function consumirMensajes() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'mi_cola';

  await channel.assertQueue(queue, { durable: true, autoDelete: false });
  console.log(`🎧 Esperando mensajes en la cola: ${queue}`);

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const contenido = JSON.parse(msg.content.toString());
      console.log(`📥 Mensaje recibido - ID: ${contenido.id}`, contenido.data);

      // ⏳ Simula delay de procesamiento (3 segundos)
      setTimeout(() => {
        console.log(`✅ Mensaje procesado - ID: ${contenido.id}`);
        channel.ack(msg); // Marca como procesado
      }, 3000);
    }
  }, { noAck: false });
}

consumirMensajes();