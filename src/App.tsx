import { useEffect, useState } from 'react';
import './App.css'
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

function App() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => {
        // Fetch details for each Pokémon (like image)
        const promises = data.results.map((pokemon: { url: RequestInfo | URL; }) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(promises).then((results) => setPokemonData(results));
      });
  }, []);

  return (
    <div className="container">
      <h1>Pokémon List</h1>
      <div className="pokemon-list">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
