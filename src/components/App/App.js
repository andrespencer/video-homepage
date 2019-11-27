import React, {PureComponent} from 'react'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo'
import OverlayMessage from '../OverlayMessage/OverlayMessage'
import ControlPanel from '../ControlPanel/ControlPanel'
import translations from '../../translations'
import './App.css'

class App extends PureComponent {
  constructor (props) {
    super(props)

    this.getRandomTranslation = this.getRandomTranslation.bind(this)
    this.generateRandomSentence = this.generateRandomSentence.bind(this)
    this.handleHeadingChange = this.handleHeadingChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleToggleTheme = this.handleToggleTheme.bind(this)

    this.state = {
      theme: "light",
      heading: translations.defaultText,
      userEdited: false,
      forceHeadingUpdate: true
    }
  }
 
  componentDidMount () {
    // If we have saved the state locally, let's load it now
    if (localStorage.getItem("state")) {
      /* When typing in a component that has contentEditable, updating the parent's state via callback will cause the child component to re-render, which will in turn make the caret move to the beginning of the content.
      To prevent this from happening, we only force an update of the child component when we know the parent is sending a new heading (in this case, the heading stored in localStorage).
      More information: https://github.com/facebook/react/issues/14904 */
      let newState = JSON.parse(localStorage.getItem("state"))
      newState.forceHeadingUpdate = true
      this.setState(newState)
    // Otherwise, we'll generate a random sentence and theme based on the time of the day
    } else {
      this.generateRandomSentence()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.userEdited && this.state !== prevState) {
      // The user has made changes, so let's save it locally
      localStorage.setItem("state", JSON.stringify(this.state))
    }
  }

  generateRandomSentence () {
    const now = new Date()
    const hours = now.getHours()
    let timeOfDay = "morning"
    let theme = "light"

    if (hours > 11 && hours <= 17) {
      timeOfDay = "afternoon"
    } else if (hours > 17 && hours <= 23) {
      timeOfDay = "evening"
      theme = "dark"
    } else if (hours > 23 && hours <= 5) {
      timeOfDay = "night"
      theme = "dark"
    }
    
    this.setState({
      theme: theme,
      heading: this.getRandomTranslation(timeOfDay) + ', ' + this.getRandomTranslation("pronouns") + this.getRandomTranslation("punctuation"),
      forceHeadingUpdate: true,
      userEdited: false
    })
  }

  getRandomTranslation (type) {
    return translations[type][Math.floor(Math.random()*translations[type].length)]
  }

  handleHeadingChange (e) {
    this.setState({
      heading: e.target.innerHTML,
      userEdited: true,
      forceHeadingUpdate: false
    })
  }

  handleReset () {
    localStorage.removeItem("state")
    this.generateRandomSentence()
  }

  handleToggleTheme () {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light"
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
          savedText={translations.savedText}
          forceHeadingUpdate={this.state.forceHeadingUpdate}
          userEdited={this.state.userEdited}
        />
        <ControlPanel
          theme={this.state.theme}
          translations={translations}
          userEdited={this.state.userEdited}
          handleReset={this.handleReset}
          handleToggleTheme={this.handleToggleTheme}
        />
      </div>
    )
  }
}

export default App