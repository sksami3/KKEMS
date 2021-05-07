using Inventory.Core.Entity;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Core.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Business.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task Add(Product product)
        {
            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();
        }

        public async Task<Product> GetProductById(int guid)
        {
            return await _productRepository.FindAsync(guid);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productRepository.All().ToListAsync();
        }

        public async Task Remove(int productId)
        {
            await _productRepository.Remove(productId);
        }

        public async Task Update(Product product)
        {
            await _productRepository.UpdateProduct(product);
        }
    }
}
