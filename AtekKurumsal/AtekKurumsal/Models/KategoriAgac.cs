using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AtekKurumsal.Models
{
    public class KategoriAgac
    {
        KurumsalSiteAtekEntities db = new KurumsalSiteAtekEntities();
        public List<Kategori> AnaKategorileriGetir()
        {
            return db.Kategori.Where(x => x.ÜstKategoriId == null).ToList();
        }

        public List<Kategori> AltKategorileriGetir(int KategoriId)
        {
            return db.Kategori.Where(x => x.ÜstKategoriId == KategoriId).ToList();
        }
    }
}