module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://restfulUser:Secret56@ds161224.mlab.com:61224/restfulapi',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}
