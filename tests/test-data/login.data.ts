if (!process.env.VALID_EMAIL_ADDRESS) {
  throw new Error('VALID_EMAIL_ADDRESS must be set');
}

if (!process.env.VALID_PASSWORD) {
  throw new Error('VALID_PASSWORD must be set');
}

if (!process.env.VALID_USERNAME) {
  throw new Error('VALID_USERNAME must be set');
}

export const credentials = {
  valid: {
    email: process.env.VALID_EMAIL_ADDRESS,
    password: process.env.VALID_PASSWORD,
    username: process.env.VALID_USERNAME,
  },
  invalid: {
    email: process.env.VALID_EMAIL_ADDRESS,
    password: 'invalid',
    username: process.env.VALID_USERNAME,
  },
};
