using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MangaReader.Startup))]
namespace MangaReader
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
