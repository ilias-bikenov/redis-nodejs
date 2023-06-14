import { getCacheClient } from "../redis/index.js";
import buildCacheKey from "../utils/cache.js";


export const cacheGetSpecies = async (req, res, next) => {
    const species = req.params.species;
    let results;
    try {
        const cacheKey = buildCacheKey(species);
    const cacheClient = getCacheClient();  
    const cacheResults = await cacheClient.get(cacheKey);

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