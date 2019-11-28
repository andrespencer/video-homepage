import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './ControlPanel.css' 

class ControlPanel extends PureComponent {
  render () {
    return (
    	<footer className="ControlPanel">
    		{this.props.userChanged &&
    			<Button
      			text={this.props.translations.resetText}
      			onClick={this.props.handleReset}
      		/>
    		}
      	<Button
      		text={this.props.theme === "light" ? this.props.translations.darkModeText : this.props.translations.lightModeText}
      		onClick={this.props.handleToggleTheme}
      	/>
      </footer>
    )
  }
}

ControlPanel.propTypes = {
  theme: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
  userChanged: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleToggleTheme: PropTypes.func.isRequired
}

export default ControlPanel