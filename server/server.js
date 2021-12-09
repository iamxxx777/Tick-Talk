require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

let io;

if(process.env.NODE_ENV === "development") {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT"]
        }
    })
} else {
    io = new Server(httpServer)
}

io.on('connection', (socket) => {
    socket.on("join channel", (channel) => {
        socket.join(channel);
    }); 

    socket.on("leave channel", (channel) => {
        socket.leave(channel);
    });

    socket.on("message", (data) => {
        io.to(data?.channel).emit('message', data?.message);    
    });

    socket.on("new user", (data) => {
        io.to(data?.channel).emit('new user', data?.user)
    })

    socket.on("created channel", (channel) => {
        socket.emit("created channel", channel);
        
    });
})

const { connectDB } = require("./config/connectDB");
const profileRoute = require("./routes/profileRoute");
const messagesRoute = require("./routes/messagesRoute");
const channelsRoute = require("./routes/channelsRoute");

connectDB();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/profile", profileRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/channels", channelsRoute);


const __currentDirectory = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__currentDirectory, '/client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__currentDirectory, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
    console.log(`App listening on port ${port}`)
});