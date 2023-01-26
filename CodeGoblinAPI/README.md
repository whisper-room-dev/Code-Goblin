# `Code Goblin API`

The Code Goblin API is a Restful API that provides access to the Code Goblin database. It is written in Java and uses the [Spark](https://sparkjava.com/) framework. 

The API main goal is to take load off of the bot and provide a more stable way to access information from the discord API. This will also help us with sharding in the future. Instead of having to make a request to each shard, the shards will just make a request to the API.

## Endpoints

### GET /api/v1/guilds

Returns a JSON array of guilds that the bot is in.

*Example return data*
```text
{
    "id": "name"
}
```

### GET /api/v1/guilds/:id

Returns a JSON object with information about the guild with the given ID.

```text
[
    {
       "memberCount": 3,
       "name": "Pingu",
       "id": "943700714469855332"
    }
]
```
