const express = require('express');
const cors = require('cors');

require('./db/mongoose')


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

////////////////////////////
//// USER ROUTES
const userAuthRouter = require('./routers/user/userAuth');

app.use(userAuthRouter);


//////////////////////////////
///// ADMIN ROUTES
const adminAuthRouter = require('./routers/admin/adminAuth');
const crudUsersRouter = require('./routers/admin/crudUsers');
const crudEventRouter = require('./routers/admin/crudEvent');

app.use(adminAuthRouter);
app.use(crudUsersRouter);
app.use(crudEventRouter);

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})