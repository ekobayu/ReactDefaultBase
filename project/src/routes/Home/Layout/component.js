import React, { Component } from 'react'
import { Grid, Container, Image, Card, Link, Button } from 'semantic-ui-react';
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
                <Card>
                  <Image src={item.Poster} wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>{item.Title}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Link to={`/app/project/detail/${item.id}`}>
                          <Button basic color='green'>
                            List Post
                          </Button>
                        </Link>
                      </div>
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