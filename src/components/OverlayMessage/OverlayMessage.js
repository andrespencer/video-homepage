import React, {PureComponent} from 'react'
import './OverlayMessage.css'

class OverlayMessage extends PureComponent {
  render () {
    return (
      <main className="OverlayMessage">
      	<h1 
      		className="OverlayMessage__Heading" 
      		contentEditable="true" 
      		suppressContentEditableWarning={true}
      		onInput={this.props.handleChange}
      	>
      			{this.props.heading}
      	</h1>
      </main>
    )
  }
}

export default OverlayMessage