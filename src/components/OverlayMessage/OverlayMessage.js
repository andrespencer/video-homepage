import React, {PureComponent} from 'react'
import './OverlayMessage.css'

class OverlayMessage extends PureComponent {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = {
      justSaved: false,
      userChanged: this.props.userChanged,
      heading: this.props.heading
    }
  }

  componentDidUpdate () {
    if (this.props.forceHeadingUpdate && this.props.heading !== this.state.heading) {
      this.setState({
        heading: this.props.heading
      })
    }
    if (this.props.userChanged !== this.state.userChanged) {
      this.setState({
        userChanged: this.props.userChanged
      })
    }
  }

  handleChange (e) {
    this.setState({
      userChanged: true
    })
    this.props.handleChange(e)
  }

  handleBlur (e) {
    if (this.state.userChanged && !this.state.justSaved) {
      this.setState({
        justSaved: true,
        heading: e.target.innerHTML
      })
      setTimeout(
        () => this.setState({
          justSaved: false,
          userChanged: false
        }), 3000
      )
    }
  }

  handleKeyDown (e) {
    if (e.keyCode === 13) e.preventDefault()
  }

  render () {
    return (
      <main className="OverlayMessage">
        <div className="OverlayMessage__Wrapper">
        	<h1 className="OverlayMessage__Heading"
            contentEditable="true" 
            suppressContentEditableWarning={true}
            onInput={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          >
        		{this.state.heading}
        	</h1>
          <p 
            className="OverlayMessage__Saved"
            style={this.state.justSaved && this.props.userChanged ? {opacity:1} : {opacity:0}}
          >
            {this.props.savedText}
          </p>
        </div>
      </main>
    )
  }
}

export default OverlayMessage