// docs: https://beta.nextjs.org/docs/data-fetching/fetching (server component)
import styles from './styles.module.css'

const pokemonListDetailed: any[] = []

async function getKantoPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // not needed: { cache: 'no-store' } (would be for dynamic fetching per request)
  const data = await res.json()

  const pokemonList = data.results as any[]

  for (const pokemon of pokemonList) {
    getPokemonDetails(pokemon, pokemonListDetailed)
  }

  return pokemonListDetailed as any[]
}

async function getPokemonDetails(pokemon: { name: any }, pokemonListDetailed: any[]) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  const data = await res.json()

  // Check if the Pokemon already exists in the array
  const existingPokemon = pokemonListDetailed.find(p => p.id === data.id)
  if (!existingPokemon) {
    pokemonListDetailed.push(data)
  }
}

export default async function PokemonPage() {
  const kantoPokemon = await getKantoPokemons()

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
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        {
          pokemon.types.map((type :any) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
      </ul>
    </div>
  )
}
