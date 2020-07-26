using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Pokemon.Model
{
    [DataContract(Name = "pokemon")]
    public class PokemonRes
    {
        [DataMember(Name = "count")]
        public int Count { get; set; }

        [DataMember(Name = "next")]
        public string Next { get; set; }

        [DataMember(Name = "results")]
        public List<PokemonNameUrl> PokemonNameUrlList;
    }

    [DataContract(Name = "results")]
    public class PokemonNameUrl
    {
        [DataMember(Name = "name")]
        public string name { get; set; }

        [DataMember(Name = "url")]
        public string Url { get; set; }
    }
}
