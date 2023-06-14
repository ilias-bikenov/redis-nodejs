import * as redis from "redis"

class CacheClient {

    async init (callback) {
        this.redisClient = redis.createClient();

        this.redisClient.on("error", (error) => console.error(`Error : ${error}`));

        await this.redisClient.connect();
        // do something async and call the callback:
        callback.bind(this)();
    }

    get(query) {
        return this.redisClient.get(query)
    }

    set(id, data, options = undefined) {
        return this.redisClient.set(id, data, options)
    }
}
const cacheClientInstance = new CacheClient;
await cacheClientInstance.init(() => console.log('Redis connection was initialized'));
export const getCacheClient = () => cacheClientInstance;