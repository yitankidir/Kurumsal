using System.Web;
using System.Web.Optimization;

namespace AtekKurumsal
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/assets/js/jquery/jquery-1.11.0.min.js",
                        "~/assets/js/jquery/jquery-migrate-1.2.1.min.js",
                        "~/assets/js/jquery/jquery.unobtrusive-ajax.min.js",
                        "~/assets/js/jquery/jquery.unobtrusive-ajax.js",
                        "~/assets/js/jquery/jquery.validate.unobtrusive.bootstrap.js",
                        "~/assets/js/jquery/jquery.validate.unobtrusive.bootstrap.min.js"));

             
        }
    }
}



//bundles.Add(new StyleBundle("~/assets/css").Include(
//        "~/assets/css/authentication.css",
//        "~/assets/css/cms.css",
//        "~/assets/css/contact-form.cs",
//        "~/assets/css/global.cs",
//        "~/assets/css/product.css",
//        "~/assets/css/product_list.css",
//        "~/assets/css/sitemap.css",
//        "~/assets/css/stores.css"));