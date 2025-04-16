const express = require('express');
const app = express();
const accountsRoute = require('./routes/accounts-route');
const userRoute = require('./routes/user-route');
require('dotenv').config();

app.use(express.json());


app.use('/api/accounts',accountsRoute);
app.use('/api/users', userRoute)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is connecting to ${port}`);
});