const express = require("express");
const { connection } = require("./connection");
const userRouter = require("./Routes/userRoute");
const cors = require("cors");
const auth = require("./Middlewares/auth.middleware");
const taskRouter = require("./Routes/tasksRoute");

require("dotenv").config();
const app = express();

app.use(cors())
app.use(express.json());
app.use('/users', userRouter);
app.use(auth);
app.use('/tasks', taskRouter);


app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log(`Port is running on ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
});