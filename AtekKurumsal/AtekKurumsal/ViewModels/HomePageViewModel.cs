using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AtekKurumsal.Models
{
    public class HomePageViewModel
    {
        public IEnumerable<MarkaListele_Result> Marka { get; set; }
        public IEnumerable<HaberListele_Result> Haberler { get; set; }
        public IEnumerable<Ürün> Ürün { get; set; }

    }
}