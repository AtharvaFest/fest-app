const express = require('express');
const cors = require('cors');
const fileupload = require("express-fileupload");

require('./db/mongoose')


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(fileupload());

////////////////////////////
//// USER ROUTES
const userAuthRouter = require('./routers/user/userAuth');
app.use(userAuthRouter);


//////////////////////////////
///// ADMIN ROUTES
const adminAuthRouter = require('./routers/admin/adminAuth');
const crudUsersRouter = require('./routers/admin/crudUsers');
const crudEventRouter = require('./routers/admin/crudEvent');
const crudGalleryRouter = require('./routers/admin/crudGallery');

app.use(adminAuthRouter);
app.use(crudUsersRouter);
app.use(crudEventRouter);
app.use(crudGalleryRouter);

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
})