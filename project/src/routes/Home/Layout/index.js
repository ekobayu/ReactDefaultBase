import { connect } from 'react-redux'
import Component from './component'
import { selectors, actions } from '../../redux'

const mapStateToProps = (state) => ({
  dataRaw: selectors.getStocbitMovieData(state)
})

const mapDispatchToProps = {
  fetchDataRaw: actions.fetchStockbitMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
