import axios from "axios";
import { getCacheClient } from "../redis/index.js";

export const getSpeciesData = async (req, res) => {
    const species = req.params.species;
    let results;
    let isCached = false;

    try {
    const cacheClient = getCacheClient();

      const response = await axios.get(`https://www.fishwatch.gov/api/species/${species}`);
      results = response.data;

      if (results.length === 0) {
        throw "API returned an empty array";
      }

      await cacheClient.set(species, JSON.stringify(results), {
        EX: 180, //time in seconds
        NX: true,
      });

      res.send({
        fromCache: isCached,
        data: results,
      });

    } catch (error) {
      console.error(error);
      res.status(404).send("Data unavailable");
    }
  }