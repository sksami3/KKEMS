using Inventory.Core.Entity;
using Inventory.Core.Interfaces.Repositories;
using Inventory.Core.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Inventory.Core.Exception;
using Inventory.Core.ViewModel;
using System.Text.RegularExpressions;

namespace Inventory.Business.Services
{
    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _saleRepository;
        private readonly IProductRepository _productRepository;
        private readonly ISaleItemRepository _saleItemRepository;
        private readonly IPaymentMethodService _paymentMethodService;
        private readonly IMapper _mapper;

        public SaleService(ISaleRepository saleRepository, IProductRepository productRepository,
            ISaleItemRepository saleItemRepository, IPaymentMethodService paymentMethodService, IMapper mapper)
        {
            _saleRepository = saleRepository;
            _productRepository = productRepository;
            _saleItemRepository = saleItemRepository;
            _paymentMethodService = paymentMethodService;
            _mapper = mapper;
        }

      

        public async Task<IEnumerable<SaleViewModel>> GetSales()
        {
            var sale = await _saleRepository.All().OrderByDescending(x => x.CreateDate).ToListAsync();
            return _mapper.Map<List<Sales>, List<SaleViewModel>>(sale);
        }

        public async Task Add(SaleViewModel model)
        {
            var salesModel = new Sales { Id = int.NewGuid() };
            //TODO
            //salesModel.UserId = model.UserId;
            await GetSalesModel(model, salesModel);
            try
            {
                await _saleRepository.AddAsync(salesModel);
                await _saleRepository.SaveChangesAsync();
            }
            catch(Exception e)
            {
                throw e;
            }
            
        }

        public async Task Update(SaleViewModel model)
        {
            var sale = await _saleRepository.FindAsync(model.Id);
            if (sale == null) throw new GenericException("Sale not found");

            await RemoveSalesItem(sale);

            await GetSalesModel(model, sale);
            _saleRepository.Update(sale);
            await _saleItemRepository.SaveChangesAsync();
        }

        private async Task RemoveSalesItem(Sales sale)
        {
            if (sale.Items.Any())
            {
                _saleItemRepository.DeleteRange(sale.Items.ToList());
                await _saleItemRepository.SaveChangesAsync();
            }
        }

        private async Task GetSalesModel(SaleViewModel model, Sales salesModel)
        {
            await AddItemAndGetTotal(model, salesModel);
            salesModel.CustomerId = model.CustomerId;
            salesModel.Notes = model.Notes;
            salesModel.Discount = model.Discount;
            salesModel.SaleCode = Regex.Replace(Convert.ToBase64String(int.NewGuid().ToByteArray()), "[/+=]", ""); ;
            salesModel.Status = model.Status;
            salesModel.PaymentMethod = await _paymentMethodService.GetPaymentMethodById(model.PaymentMethod.Id);
            salesModel.SalesDate = DateTime.Now;
            salesModel.GrandTotal = GetGrandTotal(salesModel);
        }

        private static double GetGrandTotal(Sales salesModel)
        {
            if (salesModel.Discount != null)
                return salesModel.Total - ((double)salesModel.Discount/100* salesModel.Total);
            return salesModel.Total;
        }

        private async Task AddItemAndGetTotal(SaleViewModel model, Sales salesModel)
        {
            salesModel.Total = 0D;
            if (salesModel.Items.Any())
                throw new GenericException("Sales item's can't be empty");

            foreach (var item in model.Items)
            {
                var product = await _productRepository.FindAsync(item.ProductId);
                if (product == null)
                    throw new GenericException("product not found");

                salesModel.Items.Add(new SalesItemsModel
                {
                    Price = product.Price,
                    Name = product.Name,
                    Quantity = item.Quantity,
                    Amount = product.Price * item.Quantity,
                    SalesId = salesModel.Id,
                    Product = product
                });
                salesModel.Total += product.Price * item.Quantity;
            }
        }

        public async Task Remove(int id)
        {
            var sale = await _saleRepository.FindAsync(id);
            if (sale == null) throw new GenericException("sales not found");

            sale.IsDelete = true;
            _saleRepository.Update(sale);
            await _saleRepository.SaveChangesAsync();
        }

        public async Task<Sales> GetById(int id)
        {
            var sale = await _saleRepository.FindAsync(id);
            if (sale == null) throw new GenericException("sales not found");

            sale.Items = await _saleItemRepository.All().Where(x => x.SalesId == sale.Id).ToListAsync();
            return sale;
        }
    }
}
