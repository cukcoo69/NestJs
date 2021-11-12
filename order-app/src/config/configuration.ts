export default () => ({
  port: parseInt(process.env.PORT, 10) || 8081,
  dbUrl:
    process.env.DB_URL ||
    `mongodb+srv://cukcoo:yesican@mern.h0ree.mongodb.net/entryApp?retryWrites=true&w=majority`,
  amqpUrl:
    process.env.AMQP_URL ||
    'amqps://vcsbtoqs:Uyp5EF_4fJKJClxn3Gj769p3e2CFbUt6@gerbil.rmq.cloudamqp.com/vcsbtoqs',
});
