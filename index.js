import express from "express";
import {cacheGetSpecies} from "./src/middleware/species.js";
import {getSpeciesData} from "./src/species/species.service.js";

const app = express();
const port = process.env.PORT || 3000;

app.get('/fish/:species', cacheGetSpecies, getSpeciesData)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})