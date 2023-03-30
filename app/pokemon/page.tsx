// docs: https://beta.nextjs.org/docs/data-fetching/fetching

async function getKantoPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  return data.results as any[]
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
    <h2>{pokemon.name}</h2>
  )
}
