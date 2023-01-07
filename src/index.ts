import express from "express";
import aircraftRabSearch from "./AircraftRabSearch";

const app = express();

app.get("/", async (request, response) => {
    const { registration } = request.query;

    if(registration){
        return response.send(await aircraftRabSearch(registration.toString()));
    }

});


app.listen(3333);