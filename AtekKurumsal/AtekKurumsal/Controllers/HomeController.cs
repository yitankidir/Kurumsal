
using AtekKurumsal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AtekKurumsal.Controllers
{
    public class HomeController : Controller
    {
        KurumsalSiteAtekEntities db = new KurumsalSiteAtekEntities();

        KategoriAgac tree = new KategoriAgac();
        public ActionResult _Logo()
        {
            var item = db.Logo.FirstOrDefault();
            return PartialView(item);
        }

        public ActionResult _AnaBasliklar()
        {
            return PartialView(tree.AnaKategorileriGetir());
        }

        public ActionResult _AltKategorileriListele(int ÜstKategoriId)
        {
            if(tree.AltKategorileriGetir(ÜstKategoriId).Count()==0)
            {
                return null;
            }
            else
            {
                return PartialView(tree.AltKategorileriGetir(ÜstKategoriId));
            }

        }
        public ActionResult _GenisAltKategori(int ÜstKategoriId)
        {
            
            return PartialView(tree.AltKategorileriGetir(ÜstKategoriId));
        }

        public ActionResult _GenisAltKategoriList(int ÜstKategoriId)
        {
            return PartialView(tree.AltKategorileriGetir(ÜstKategoriId));
        }

        public ActionResult Index()
        {
            HomePageViewModel nesne = new HomePageViewModel();
            nesne.Ürün = db.Ürün.ToList();
            nesne.Haberler = db.HaberListele();
            nesne.Marka = db.MarkaListele();
            return View(nesne);
        }

        public ActionResult About()
        {
            var markas = db.Markalar.ToList();
            return View(markas);
        }

        public ActionResult Vizyon()
        {
            return View();
        }

        public ActionResult SSS()
        {
            return View();
        }
 
        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Location()
        {
            return View();
        }




    }
}