import React from 'react'
import PropTypes from 'prop-types'
import { WithAutoScale } from './WithAutoScale'

const DesktopVersion = ({ children }) => <>
  <div className="top-bar"></div>
  <div className="camera"></div>
  <div className="screen">
    <div className='wrapper-content-desktop'>
      {
        children
      }
    </div>
  </div>
  <div className="bottom-bar"></div>
</>

const DesktopVersionHOC = WithAutoScale(`marvel-device macbook`)(DesktopVersion)

export default DesktopVersionHOC

DesktopVersion.propTypes = {
  getSize: PropTypes.func,
  children: PropTypes.any,
  parentSize: PropTypes.any,
  isModal: PropTypes.any
}
