const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

// const https = require('https');
// const fs = require('fs');
// const key = fs.readFileSync('./key.pem');
// const cert = fs.readFileSync('./cert.pem');

const app = express(); // create express app
// const server = https.createServer({key: key, cert: cert }, app);
const port = process.env.PORT || 8080; // Setup server port

app.use(cors({ origin: '*' })); // Разрешаем корс методы


app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.get('/', (req, res) => {
    res.send("Hello World");
}); // define a root route

const taskRouter = require('./routes/taskRouter') // Require employee routes
app.use('/api/v1/task', taskRouter) // using as middleware
const meetRoutes = require('./routes/meetRouter') // Require employee routes
app.use('/api/v1/meet', meetRoutes) // using as middleware
const projectRoutes = require('./routes/projectRouter') // Require employee routes
app.use('/api/v1/project', projectRoutes) // using as middleware
const placeRouter = require('./routes/placeRouter') // Require employee routes
app.use('/api/v1/place', placeRouter) // using as middleware
const employeeRoutes = require('./routes/userRouter')
app.use('/api/v1/user', employeeRoutes)
const uniqueRoutes = require('./routes/uniqueRouter')
app.use('/api/v1/unique', uniqueRoutes)
const mainRouter = require('./routes/mainRouter')
app.use('/api/v1/main', mainRouter) // using as middleware

const profileRouter = require('./routes/profileRouter')
app.use('/api/v1/profile', profileRouter)

const imageRouter = require('./routes/imageRouter')
app.use('/api/v1/image', imageRouter)

// server.
app.listen(port, () => { console.log(`Server is listening on port ${port}`) }); // listen for requests


var static = require('node-static');
var fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(3002);