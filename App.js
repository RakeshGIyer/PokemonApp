import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { PokemonDetails } from './components/PokemonDetails';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/pokemondetails' component={PokemonDetails} />
      </Layout>
    );
  }
}
