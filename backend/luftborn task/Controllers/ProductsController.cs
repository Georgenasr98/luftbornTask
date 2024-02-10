using System;
using Microsoft.AspNetCore.Mvc;
using luftborn_task.Models;
using luftborn_task.Services;
using Microsoft.AspNetCore.Http.HttpResults;
namespace luftborn_task.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class ProductsController:Controller
    {
        private readonly MongoDBService _mongoDBService;
        public ProductsController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;

        }
        [HttpGet] public async Task<List<Products>> Get() 
        {
            return await _mongoDBService.Get();
        }
        [HttpPost] public async Task<IActionResult> Post([FromBody]Products product) 
        {
            await _mongoDBService.Add(product);
            return CreatedAtAction(nameof(Get),new {id = product.Id},product);
        }
        [HttpPut("{id}")] public async Task<IActionResult> EditProduct(string id, [FromBody] Products products) 
        {
            var res=await _mongoDBService.Edit(id,products);
            if(res==200)
                return Ok(res);
            return NotFound();
        }
        [HttpDelete("{id}")] public async Task<IActionResult> DeleteProduct(string id)
        {
            await _mongoDBService.Delete(id);
            return NoContent();
        }
    }
}
