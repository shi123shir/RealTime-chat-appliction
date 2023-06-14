const express = require("express")
const route = require("./router/route")
const app = express();
const connectDB = require("./config/db");
const {notFound, errorHandler} = require("./middleware/errorMiddleware")
const cors = require("cors")


app.use(cors());


connectDB();
  app.use(express.json());



app.use("/api", route)

app.use(notFound)
app.use(errorHandler)

app.listen("6000", ()=>{
    console.log(`server is running on port 6000 `.yellow)
})
