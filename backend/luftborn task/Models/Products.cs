using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace luftborn_task.Models
{
    public class Products
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id {  get; set; }
        public string productName { get; set; } = null!;
        public string productDescription { get; set; } = null!;
        public string productPrice { get; set; } = null!;



    }
}
