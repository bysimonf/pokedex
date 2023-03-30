// docs: https://beta.nextjs.org/docs/data-fetching/fetching

async function getKantoPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  const pokemonList = data.results as any[]

  const pokemonListDetailed: any[] = []

  for (const pokemon of pokemonList) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    const data = await res.json()
    pokemonListDetailed.push(data)
  }

//pokemonListDetailed[0].types.forEach((type :any) => console.log(type.type.name))

  return pokemonListDetailed as any[]
}

export default async function PokemonPage() {
  const kantoPokemon = await getKantoPokemon()

  return (
    <>
      <h1>Pokédex</h1>
      <div>
        {
          kantoPokemon.map((pokemon) => {
            return <Pokemon key={pokemon.name} pokemon={pokemon}/>
          })
        }
      </div>
    </>
  )
}

function Pokemon({ pokemon }:any) {
  return (
    <>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        {
          pokemon.types.map((type :any) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
      </ul>
    </>
  )
}
