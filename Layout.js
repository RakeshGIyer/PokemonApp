import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { FetchData } from './FetchData';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
            <Col sm={3}>
            //History to be here instead of NavNenu
            <NavMenu />
          </Col>
          <Col sm={9}>
            <FetchData />
          </Col>
        </Row>
      </Grid>
    );
  }
}
