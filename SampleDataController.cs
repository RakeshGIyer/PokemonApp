using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Pokemon.Model;

namespace Pokemon.Controllers
{
    [Route("api/[controller]")]
    public class PokeApiController : Controller
    {
        private const string BaseAddress = "https://pokeapi.co/api/v2/";

        [HttpGet("[action]")]
        public List<PokemonNameUrl> ReturnAllPokemons()
        {
            var req = BuildBasicWebRequest("pokemon", "GET");
            var response =  GetWebResponse<PokemonRes>(req);
            return response.PokemonNameUrlList;
        }

        [HttpGet("[action]")]
        public List<PokemonNameUrl> ReturnPokemonByName(string name)
        {
            var req = BuildBasicWebRequest($"pokemon/{name}", "GET");
            var response = GetWebResponse<PokemonRes>(req);
            return response.PokemonNameUrlList;
        }

        private WebRequest BuildBasicWebRequest(string relativeAddress, string httpVerb)
        {
            var baseAddress = new Uri(BaseAddress, UriKind.Absolute);
            var relativePath = new Uri(relativeAddress, UriKind.Relative);
            var webRequest = WebRequest.Create(new Uri(baseAddress, relativePath));
            webRequest.Method = httpVerb;
            return webRequest;
        }

        private TReturnType GetWebResponse<TReturnType>(WebRequest wr)
        {
            HttpWebResponse resp = null;
            var returnValue = default(TReturnType);
            try
            {
                resp = (HttpWebResponse)wr.GetResponse();
                var respStream = resp.GetResponseStream();

                if (respStream != null)
                {
                    var resultString = new StreamReader(respStream).ReadToEnd();

                    try
                    {
                        returnValue = (new JsonSerializer()).Deserialize<TReturnType>(new JsonTextReader(new StringReader(resultString)));
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Unexpected error in JsonDeseralization: {ex.Message}");
                    }
                }
            }
            catch (Exception except)
            {
                throw new Exception($"Exception in getting response from PokeApi: {except.Message}");
            }
            finally
            {
                resp?.Close();
            }

            return returnValue;
        }

    }
}
