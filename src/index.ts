import express from "express";
import aircraftRabSearch from "./AircraftRabSearch";
import http from 'http';
import { Server } from "socket.io"

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

app.get("/search-rab", async (request, response) => {
    const { registration } = request.query;
    console.log("TESTEEE")
    if(registration){
        return response.send(await aircraftRabSearch(registration.toString()));
    }

});
app.get("/", async (request, response) => {
    console.log("CONECTADo");
    io.on("connection", (socket) => {

        console.log("CONECTADOOOO....");
        console.log(socket.id);
        
        })    
});


app.listen(3333, () => {


    console.log("PORTA 3333")
});

