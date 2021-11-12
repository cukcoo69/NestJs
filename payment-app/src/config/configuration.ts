export default () => ({
  mongoUrl:
    process.env.DB_URL ||
    'mongodb+srv://cuong:yesican@cluster0.gyglg.mongodb.net/paymentApp?retryWrites=true&w=majority',
  amqpUrl:
    process.env.AMQP_URL ||
    'amqps://vcsbtoqs:Uyp5EF_4fJKJClxn3Gj769p3e2CFbUt6@gerbil.rmq.cloudamqp.com/vcsbtoqs',
});
