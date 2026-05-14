import React from 'react'
import PropTypes from 'prop-types'

const Header = ({isOptLef, optionLeft, isText, text, isOptRig, optionRight}) => {
  return (
    <div className='test-header'>
        {(isOptLef) && 
            <div className='align-left'>{optionLeft}</div>
        }
        {(isText) && 
            <div className='align-center'>{text}</div>
        }
        {(isOptRig) && 
            <div className='align-right'>{optionRight}</div>
        }
    </div>
  )
}

Header.propTypes = {
    isOptLef: PropTypes.bool,
    optionLeft: PropTypes.string,
    isText: PropTypes.bool,
    text: PropTypes.string,
    isOptRig: PropTypes.bool,
    optionRight: PropTypes.string,
}

export default Header