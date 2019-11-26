import React, {PureComponent} from 'react'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo'
import OverlayMessage from '../OverlayMessage/OverlayMessage'
import translations from '../../translations'
import './App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)

    this.handleHeadingChange = this.handleHeadingChange.bind(this)
    this.getRandomTranslation = this.getRandomTranslation.bind(this)

    this.state = {
      theme: "light",
      heading: translations.defaultText
    }
  }
 
  componentDidMount () {
    const now = new Date()
    const hours = now.getHours()
    let stage = "morning"
    let theme = "light"

    if (hours > 11 && hours <= 17) {
      stage = "afternoon"
    } else if (hours > 17 && hours <= 23) {
      stage = "evening"
      theme = "dark"
    } else if (hours > 23 && hours <= 5) {
      stage = "night"
      theme = "dark"
    }
    
    this.setState({
      theme: theme,
      heading: this.getRandomTranslation(stage) + ', ' + this.getRandomTranslation("pronouns") + this.getRandomTranslation("punctuation")
    })
  }

  getRandomTranslation (type) {
    return translations[type][Math.floor(Math.random()*translations[type].length)]
  }

  handleHeadingChange (e) {
    this.setState({
      heading: e.target.innerHTML
    })
  }

  render () {
    return (
      <div className="App">
        <BackgroundVideo
          theme={this.state.theme}
        />
        <OverlayMessage 
          heading={this.state.heading}
          handleChange={this.handleHeadingChange}
        />
      </div>
    )
  }
}

export default App