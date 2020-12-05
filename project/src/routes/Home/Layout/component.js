import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import './style.scss'

export default class Layout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  async componentDidMount () {
    const { fetchRawData } = this.props
    this.setState({
      loaded: true
    })
    fetchRawData()
  }

  render () {
    const { dataRaw } = this.props

    return  <Container>
        <Grid className='list-album' columns={3}>
          <Grid.Row>
          {
            dataRaw.map(item => (
              <Grid.Column key={item.id}>
                {item.Title}
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