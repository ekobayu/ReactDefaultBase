import { connect } from 'react-redux'
import Component from './component'
import { selectors, actions } from '../../redux'

const mapStateToProps = (state) => ({
  dataRaw: selectors.getData(state)
})

const mapDispatchToProps = {
  fetchRawData: actions.fetchRawData
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
