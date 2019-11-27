import React, {PureComponent} from 'react'
import Button from '../Button/Button'
import './ControlPanel.css' 

class ControlPanel extends PureComponent {
  render () {
    return (
    	<footer className="ControlPanel">
    		{this.props.userEdited &&
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

export default ControlPanel