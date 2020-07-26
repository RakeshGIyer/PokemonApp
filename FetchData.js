import React, { Component } from 'react';
import PokemonDetails from './PokemonDetails';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
      this.state = { pokemons: [], loading: true };

      fetch('api/PokeApi/ReturnAllPokemons')
      .then(response => response.json())
      .then(data => {
        this.setState({ pokemons: data, loading: false });
      });
    }

    static displayPokemonDetails(name) {
        return (<PokemonDetails
            name={name}
            />)
    }

  static renderForecastsTable(pokemons) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon =>
            <tr key={pokemon.name}>
                  <td onClick={FetchData.displayPokemonDetails(pokemon.name)}>{pokemon.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.pokemons);

    return (
      <div>
        <h1>All Pokemon</h1>
        {contents}
      </div>
    );
  }
}
