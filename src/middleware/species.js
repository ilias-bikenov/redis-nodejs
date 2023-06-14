import { getCacheClient } from "../redis/index.js";

export const cacheGetSpecies = async (req, res, next) => {
    const species = req.params.species;
    let results;
    try {
    const cacheClient = getCacheClient();  
    const cacheResults = await cacheClient.get(species);

      if (cacheResults) {
        results = JSON.parse(cacheResults);
        res.send({
          fromCache: true,
          data: results,
        });

      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(404);
    }
}