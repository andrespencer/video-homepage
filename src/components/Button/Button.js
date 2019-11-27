import React, {PureComponent} from 'react'
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

export default Button