import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import './Button.css' 

class Button extends PureComponent {
  render () {
    return (
    	<button
    		className="Button"
    		onClick={this.props.onClick}
    		type="button"
    	>
    		{this.props.text}
    	</button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button