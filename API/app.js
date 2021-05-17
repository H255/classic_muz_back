import express from 'express';
import dotenv from 'dotenv'
import Routes from './src/routes/route.js';
import swaggerUi from 'swagger-ui-express'
import fs from 'fs';

let swaggerFile = JSON.parse(fs.readFileSync('swagger-output.json', 'utf-8'))
dotenv.config()
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
const PORT = process.env.PORT || 3001
let x =app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server has been started on port ${PORT}`)
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
new Routes(app)
