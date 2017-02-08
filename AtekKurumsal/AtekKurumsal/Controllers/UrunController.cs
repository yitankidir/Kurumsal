using AtekKurumsal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using PagedList.Mvc;
using AtekKurumsal.ViewModels;

namespace AtekKurumsal.Controllers
{
    public class UrunController : Controller
    {
        KurumsalSiteAtekEntities db = new KurumsalSiteAtekEntities();
        ProductModel ürün = new ProductModel();

        public ActionResult Index(ProductModel model)
        {

            int pageIndex = model.Page ?? 1;

            var prdIdList = db.ÜrünKategori.Where(k => k.KategoriId == model.KategoriId).Select(x => x.ÜrünId).ToList();

            //model.Products = (from p in db.Ürün
            //                  join k in products on p.ÜrünId equals k.ÜrünId
            //                  where p.ÜrünId==k.ÜrünId
            //                  orderby (p.ÜrünId)
            //                  select new ProductListModel
            //                  {
            //                      ÜrünAdi = p.ÜrünAdi,
            //                      ÜrünKodu = p.ÜrünKodu,
            //                      Resim = p.Resim,
            //                      KategoriId = p.KategoriId
            //                  }).ToPagedList(pageIndex, 6);

            List<ProductListModel> liste = new List<ProductListModel>();

            foreach (var item in prdIdList)
            {

                liste.AddRange(db.Ürün.Where(w => w.ÜrünId == item).Select(s => new ProductListModel
                {
                    ÜrünAdi = s.ÜrünAdi,
                    Resim = s.Resim,
                    ÜrünKodu = s.ÜrünKodu,
                    KategoriId = s.KategoriId
                }).ToList());

            }
            model.Products = liste.ToPagedList(pageIndex, 6);

            if (Request.IsAjaxRequest())
            {
                return PartialView("_ÜrünListele", model);
            }
            else
            {
                return View(model);
            }
   
        }

        [HttpPost]
        public JsonResult _FilterProducts(string IdList, ProductModel model, int pageId)
        {

            //List<int> idList = Array.ConvertAll(IdList.Split(','), s => int.Parse(s));
            List<int> idList = IdList.TrimEnd(',').Split(',').Select(Int32.Parse).ToList();

            idList = idList.Distinct().ToList();

            var perPage = 6;

            var filtId = db.ÜrünÖzellik.Where(k => idList.Contains(k.AltÖzellikId)).OrderBy(x => x.ÜrünId).Select(s => new { s.ÜrünId }).Distinct();

            var sayi = filtId.Count();

            model.Products = (from p in db.Ürün
                              join k in filtId on p.ÜrünId equals k.ÜrünId
                              orderby (p.ÜrünId)
                              select new ProductListModel
                              {
                                  ÜrünAdi = p.ÜrünAdi,
                                  Resim = p.Resim,
                                  ÜrünKodu = p.ÜrünKodu,
                                  KategoriId = p.KategoriId,
                                  UrunId=p.ÜrünId
                              }).ToPagedList(pageId, perPage);

            int totalPge = sayi % perPage == 0 ? (sayi / perPage) : ((sayi / perPage) + 1);

            string pagination = "";
            for (int i = 1; i <= totalPge; i++)
            {
                pagination += "<li>" + "<a onclick=\"getProduct('" + IdList.TrimEnd(',') + "'," + i + ")\">" + i + "</a>" + "</li>";

            }
            model.pagination = pagination;

            return Json(model, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult GetAllProducts(int KategoriId,ProductModel model ,int pageId)
        {
        
            var perPage = 6;

            var products = db.Ürün.Where(k => k.KategoriId == KategoriId).ToList();
            var sayi = products.Count();

            model.Products = (from p in db.Ürün
                              where p.KategoriId == KategoriId
                              orderby (p.ÜrünId)
                              select new ProductListModel
                              {
                                  ÜrünAdi = p.ÜrünAdi,
                                  ÜrünKodu = p.ÜrünKodu,
                                  Resim = p.Resim,
                                  KategoriId = p.KategoriId,
                                  UrunId=p.ÜrünId
                              }).ToPagedList(pageId, perPage);

            int TotalPage = sayi % perPage == 0 ? (sayi / perPage) : ((sayi / perPage) + 1);

            string pagination = "";

            for (int i = 1; i <= TotalPage; i++)
            {
                pagination += "<li>" + "<a onclick=\"getProduct('"+"',"+i+")\">" + i + "</a>" + "</li>";
            }

            model.pagination = pagination;
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult _FilterSidebar(int KategoriId)
        {
            var filtID = db.Kategori.Where(k => k.KategoriId == KategoriId).Select(x => x.FiltreId).SingleOrDefault();
            ürün.Özellik = db.Özellikler.Where(o => o.FiltreId == filtID).ToList();
            return PartialView(ürün);
        }

        public ActionResult _AltFilters(int id)
        {

            ürün.AltÖzellikler = db.AltÖzellikler.Where(x => x.ÖzellikId == id).ToList();
            return PartialView(ürün);
        }

        public ActionResult ProductDetails(int id)
        {
            var products = db.Ürün.Where(k => k.ÜrünId == id).FirstOrDefault();

            return View(products);
        }


    }
}

