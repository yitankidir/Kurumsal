using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AtekKurumsal.ViewModels
{
    public class ProductListModel
    {
        public int UrunId { get; set; }
        public int KategoriId { get; set; }
        public string ÜrünAdi { get; set; }
        public string Resim { get; set; }
        public string ÜrünKodu { get; set; }

    }
}