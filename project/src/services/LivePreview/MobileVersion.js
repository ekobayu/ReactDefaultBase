import React from 'react'
import PropTypes from 'prop-types'
import { WithAutoScale } from './WithAutoScale'

const MobileVersion = ({ children }) => <>
  <div className="notch">
    <div className="camera"></div>
    <div className="speaker"></div>
  </div>
  <div className="top-bar"></div>
  <div className="sleep"></div>
  <div className="bottom-bar"></div>
  <div className="volume"></div>
  <div className="overflow">
    <div className="shadow shadow--tr"></div>
    <div className="shadow shadow--tl"></div>
    <div className="shadow shadow--br"></div>
    <div className="shadow shadow--bl"></div>
  </div>
  <div className="inner-shadow"></div>
  <div className="screen">
    {
      children
    }
  </div>
  <div className="home"></div>
  <div className="bottom-bar"></div>
</>

const MobileVersionHOC = WithAutoScale(`marvel-device iphone-x`)(MobileVersion)

export default MobileVersionHOC

MobileVersion.propTypes = {
  getSize: PropTypes.func,
  children: PropTypes.any,
  parentSize: PropTypes.any,
  isModal: PropTypes.any
}
