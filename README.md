PROCESO PARA MIDDLEWARE:
npm init -y
npm install express amqplib dotenv
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
npm install uuid 
node app.js
Invoke-RestMethod -Uri http://localhost:3000/enviar `
>> -Method Post `
>> -Headers @{"Content-Type"="application/json"} `
>> -Body '{"mensaje": "Hola Rabbit"}'
