import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ere from 'element-resize-event'

export default class AutoScale extends Component {
  static propTypes = {
    children: PropTypes.node,
    wrapperClass: PropTypes.string,
    containerClass: PropTypes.string,
    contentClass: PropTypes.string,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxScale: PropTypes.number
  };

  static defaultProps = {
    wrapperClass: '',
    containerClass: '',
    contentClass: ''
  };

  constructor (props) {
    super(props)

    this.state = {
      wrapperSize: { width: 0, height: 0 },
      contentSize: { width: 0, height: 0 },
      scale: 1
    }
  }

  componentDidMount () {
    // eslint-disable-next-line react/no-string-refs
    const { wrapper, content } = this.refs
    const actualContent = content.children[0]

    this.updateState({
      ...this.state,
      contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight },
      wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight }
    })

    ere(actualContent, () => {
      this.updateState({
        ...this.state,
        contentSize: { width: actualContent.offsetWidth, height: actualContent.offsetHeight }
      })
    })

    ere(wrapper, () => {
      this.updateState({
        ...this.state,
        wrapperSize: { width: wrapper.offsetWidth, height: wrapper.offsetHeight }
      })
    })
  }

  updateState (newState) {
    const { maxHeight, maxWidth, maxScale } = this.props
    const { wrapperSize, contentSize } = newState

    let scale = (wrapperSize.width / contentSize.width)

    if (maxHeight) {
      scale = Math.min(scale, (maxHeight / contentSize.height))
    }
    if (maxWidth) {
      scale = Math.min(scale, (maxWidth / contentSize.width))
    }
    if (maxScale) {
      scale = Math.min(scale, maxScale)
    }

    this.setState({
      ...newState,
      scale
    })
  }

  render () {
    const { scale, contentSize } = this.state
    const { children, wrapperClass, containerClass, contentClass } = this.props
    const containerHeight = (scale * contentSize.height)
    const containerWidth = (scale * contentSize.width)

    return (
      // eslint-disable-next-line react/no-string-refs
      <div ref="wrapper" className={wrapperClass}>
        {/* eslint-disable-next-line react/no-string-refs */}
        <div ref="container" className={containerClass} style={{ maxWidth: '100%', overflow: 'hidden', width: containerWidth + 'px', height: containerHeight + 'px' }}>
          {/* eslint-disable-next-line react/no-string-refs */}
          <div ref="content" className={contentClass} style={{ transform: 'scale(' + scale + ')', transformOrigin: '0 0 0' }}>
            {React.Children.only(children)}
          </div>
        </div>
      </div>
    )
  }
}
