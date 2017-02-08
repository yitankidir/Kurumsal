using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PagedList;
using PagedList.Mvc;
using AtekKurumsal.Models;

namespace AtekKurumsal.ViewModels
{
    public class ProductModel
    {

        public int KategoriId { get; set; }
        public int? Page { get; set; }
        public IPagedList<ProductListModel> Products { get; set; }
        public IEnumerable<Özellikler> Özellik { get; set; }
        public IEnumerable<AltÖzellikler> AltÖzellikler { get; set; }
        public string pagination { get; set; }

    }
}