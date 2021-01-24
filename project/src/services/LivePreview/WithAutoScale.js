import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoScale from './AutoScale'
export const WithAutoScale = (customClassName) => WrappedComponent => {
  const DefaultClass = class DefaultClass extends Component {
    refCallback = element => {
      if (element) {
        this.props.getSize(element.getBoundingClientRect())
      }
    }

    render () {
      const { parentSize, isModal, realSize = false, versionLive } = this.props
      if (parentSize === null) return null
      const number = isModal ? 0 : (parentSize.width * 0.2)
      return realSize && versionLive === 'mobile'
        ? (
          <div className="flexed align-items-center justify-content-center">
            <div className={customClassName} ref={this.refCallback}>
              <WrappedComponent {...this.props}/>
            </div>
          </div>
        )
        : (
          <AutoScale
            maxWidth={isModal ? null : parentSize.width - number}
            maxHeight={isModal ? null : parentSize.height}
            maxScale={isModal ? 0.4 : null}
            wrapperClass="auto-scale-wrapper flexed justify-content-center"
            containerClass="auto-scale-container"
            contentClass="auto-scale-content"
          >
            <div className={customClassName} ref={this.refCallback}>
              <WrappedComponent {...this.props}/>
            </div>
          </AutoScale>
        )
    }
  }
  DefaultClass.propTypes = {
    getSize: PropTypes.func,
    parentSize: PropTypes.any,
    versionLive: PropTypes.any,
    isModal: PropTypes.any,
    realSize: PropTypes.bool
  }
  return DefaultClass
}
