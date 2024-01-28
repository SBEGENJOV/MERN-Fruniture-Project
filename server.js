const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http");
const express = require("express");
const usersRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const couponRouter = require("./router/couponRouter");
const blogRouter = require("./router/blogRouter");
const campainRouter = require("./router/campains");
require("./config/database")(); //Sayfa açıldıgında direkt çalışacagı için bir değişkene atama geregi duymadık
//!Server oluşturma kodları
const app = express();
//Middlewarler

//Gelen verileri JSON formatına dönüştürme işlemi yapılıyor
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/coupon", couponRouter);
app.use("/blog", blogRouter);
app.use("/campain", campainRouter);

const server = http.createServer(app);

//? Server Başlatma kodları
const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`${PORT} portu çalışıyor..`));
