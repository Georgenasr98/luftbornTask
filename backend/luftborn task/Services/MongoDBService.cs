using luftborn_task.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
namespace luftborn_task.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Products> _productsCollection;


        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _productsCollection = database.GetCollection<Products>(mongoDBSettings.Value.CollectionName);
        }
        public async Task Add(Products products)
        {
            await _productsCollection.InsertOneAsync(products);
            return;
        }

        public async Task<List<Products>> Get()
        {
            return await _productsCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<int> Edit(string id ,Products products) 
        {
            FilterDefinition<Products> filter = Builders<Products>.Filter.Eq("Id", id);
            UpdateDefinition<Products> update = Builders<Products>.Update.Set("productPrice", products.productPrice).Set("productName",products.productName).Set("productDescription", products.productDescription);
            var result =await _productsCollection.UpdateOneAsync(filter, update);
            if (result.MatchedCount == 0)
                return StatusCodes.Status404NotFound;
            return StatusCodes.Status200OK;
        }

        public async Task Delete(string id) 
        {
            FilterDefinition<Products> filter = Builders<Products>.Filter.Eq("Id", id);
            await _productsCollection.DeleteOneAsync(filter);
            return;
        }
    }
    
}
