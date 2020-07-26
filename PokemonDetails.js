import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

export class PokemonDetails extends Component {
    displayName = PokemonDetails.name

    constructor(props) {
        super(props);
        this.state = { name: props.name, loading: true };
        const name = this.state.name;
        fetch('api/PokeApi/ReturnPokemonByName/' + {name})
            .then(response => response.json())
            .then(data => {
                this.setState({ abilities: data.abilities, stats: data.stats, moves: data.moves, loading: false });
            });
    }

    

    static renderPokemonContent() {
        const { abilities, stats, moves } = this.state;
        
        return (
            <Row>
                <Col sm={4}>
                    <table className='tableAbility'>
                        <thead>
                            <tr>
                                <th>Abilities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abilities.map((ability, i) =>
                                <tr key={i}>
                                    <td>{ability}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
                <Col sm={4}>
                    <table className='tableStats'>
                        <thead>
                            <tr>
                                <th>Stats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((stat, i) =>
                                <tr key={i}>
                                    <td>{stat}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
                <Col sm={4}>
                    <table className='tableMoves'>
                        <thead>
                            <tr>
                                <th>Moves</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moves.map((move, i) =>
                                <tr key={i}>
                                    <td>{move}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Col>
            </Row>
            
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : PokemonDetails.renderPokemonContent();

        return (
            <div>
                <h1>Details: {this.props.name}</h1>
                {contents}
            </div>
        );
    }
}
