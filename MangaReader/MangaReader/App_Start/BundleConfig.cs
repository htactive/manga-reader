using System.Web;
using System.Web.Optimization;

namespace MangaReader
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/js/react-with-addons.min.js",
                      "~/Scripts/js/react-dom.min.js",                      
                      "~/Scripts/respond.js",
                      "~/Scripts/js/jRespond.min.js",
                      "~/Scripts/js/modernizr.custom.js",
                      "~/Content/assets/js/jquery.flexslider.js",
                      "~/Scripts/js/app.js",
                      "~/Scripts/js/main_lib.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/site.css",
                      "~/Content/assets/animate.css",
                      "~/Content/assets/theme.css",
                      "~/Content/assets/flexslider.css",
                      "~/Content/assets/font-awesome.min.css"
                      ));
        }
    }
}
