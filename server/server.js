const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const fileUpload = require('express-fileupload');
const router = require('./routes/routerr');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// 'https://mern-pep-frontend.vercel.app'
app.use(cors({
  origin: ['http://localhost:5173'], // Add your frontend domains here
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected...");
});

app.use('/auth', router);

app.listen(3000, () => {
  console.log("Server is listening...");
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });