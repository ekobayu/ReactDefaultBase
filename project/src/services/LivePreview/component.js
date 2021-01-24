import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'
import './device.scss'
import DesktopVersion from './DesktopVersion'
import MobileVersion from './MobileVersion'
export default class LivePreview extends Component {
  constructor (props) {
    super(props)
    this.wrapperDevice = React.createRef()
    this.state = {
      model: 'this model',
      options: [
        { key: 'desktop', text: 'Desktop Version', value: 'desktop' },
        { key: 'mobile', text: 'Mobile Version', value: 'mobile' }
      ],
      wrapperDeviceSize: null,
      size: {
        height: 10
      },
      versionLive: 'desktop'
    }
  }

  handleChange = (event, { value }) => {
    this.setState({
      versionLive: value
    })
  }

  // formatSubject = (string) => {
  //   //   return `${string[0].toUpperCase() + string.slice(1)}`
  //   // }

  dimensionUpdated = () => {
    this.refCallbackWrapperPreviewDevice(this.wrapperDevice)
  }

  componentDidMount () {
    window.addEventListener('resize', this.dimensionUpdated)
  }

  refCallbackWrapperPreviewDevice = element => {
    if (element) {
      this.wrapperDevice = element
      this.setState({
        wrapperDeviceSize: element.getBoundingClientRect()
      })
    }
  }

  render () {
    const {
      render,
      isModal
    } = this.props

    const generateWrapperStyle = () => {
      if (this.state.versionLive === 'mobile') return {}
      let height = '400px'
      return {
        maxHeight: isModal ? null : height
      }
    }

    return (
      <div className="live-preview">
        <div className="flexed justify-content-center">
          <Dropdown
            className="dropdown-layout-version dropdown-basic"
            onChange={this.handleChange}
            options={this.state.options}
            placeholder='Choose an option'
            selection
            value={this.state.versionLive}
          />
        </div>
        <div className='wrapper-preview-device min-height-40 pt-1 mb-3'
          ref={this.refCallbackWrapperPreviewDevice}
          style={generateWrapperStyle()}
        >
          {
            (this.state.versionLive === 'mobile')
              ? <MobileVersion
                {...this.props}
                versionLive={this.state.versionLive}
                parentSize={this.state.wrapperDeviceSize}
                getSize={(size) => {
                  this.setState({
                    size
                  })
                }}
              >
                {
                  render(this.state.versionLive)
                }
              </MobileVersion>
              : <DesktopVersion
                {...this.props}
                versionLive={this.state.versionLive}
                parentSize={this.state.wrapperDeviceSize}
                getSize={(size) => {
                  this.setState({
                    size
                  })
                }}>
                {
                  render(this.state.versionLive)
                }
              </DesktopVersion>
          }
        </div>
      </div>
    )
  }
}

LivePreview.propTypes = {
  children: PropTypes.any,
  render: PropTypes.any,
  subject: PropTypes.any,
  imageClassName: PropTypes.string,
  imageContentClassName: PropTypes.string,
  imageContainerClassName: PropTypes.string,
  isModal: PropTypes.bool
}
