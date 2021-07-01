import React, { Component } from 'react'
import { Grid, Container, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types'
// import './style.scss'

export default class Layout extends Component {

  async componentDidMount () {
    const { fetchRawData } = this.props
    this.setState({
      loaded: true
    })
    fetchRawData()
  }

  render () {
    const { dataRaw } = this.props
    const url = window.location.pathname
    const id = url.substring(url.lastIndexOf('/') + 1)
    const postSelected = dataRaw.filter(x => x.userId === parseInt(id))

    return  <Container>
        <Grid className='list-post' columns={3}>
          <Grid.Row>
          {
            postSelected.map(item => (
              <Grid.Column key={item.id}>
                <Card>
                  <Card.Content>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Description>{item.body}</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))
          }
          </Grid.Row>
        </Grid>
    </Container>
  }
}

Layout.propTypes = {
  dataRaw: PropTypes.any,
  fetchRawData: PropTypes.func
}
