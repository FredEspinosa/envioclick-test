import React from 'react'

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

export default Header