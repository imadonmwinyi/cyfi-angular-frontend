const axios = require('axios');

exports.handler = async function (event, context) {
  const { reference } = JSON.parse(event.body);

  if (!reference) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing reference' }),
    };
  }

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = response.data;

    if (data.status && data.data.status === 'success') {
      return {
        statusCode: 200,
        body: JSON.stringify({ verified: true, data: data.data }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ verified: false, data: data.data }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
