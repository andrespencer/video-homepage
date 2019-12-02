import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import './BackgroundVideo.css' 

class BackgroundVideo extends PureComponent {
	constructor (props) {
		super(props)

		this.updateRandomVideo = this.updateRandomVideo.bind(this)
		this.buildVideoUrl = this.buildVideoUrl.bind(this)

		// In a real world scenario, this would come from the backend counting the number of files in the directory
		this.darkSourcesLength = 5
		this.lightSourcesLength = 4

		this.state = {
			randomVideo: 1
		}		
	}

	componentDidMount () {
		this.updateRandomVideo()
	}

	componentDidUpdate (prevProps) {
		if (this.props.theme !== prevProps.theme) this.updateRandomVideo()
	}

	updateRandomVideo () {
		const arrayLength = this.props.theme === "light" ? this.lightSourcesLength : this.darkSourcesLength

		this.setState({
			randomVideo: Math.floor(Math.random()*arrayLength) + 1
		})
	}

	buildVideoUrl (thumbnail = false) {
		return process.env.PUBLIC_URL + "/video/" + this.props.theme + "-" + this.state.randomVideo + (thumbnail ? ".jpg" : ".mp4")
	}

  render () {
    return (
      <video
      	autoPlay
      	muted
      	loop
      	className="BackgroundVideo"
      	key={this.props.theme}
      	style={{backgroundImage: `url(${this.buildVideoUrl(true)}`}}
      >
	      <source src={this.buildVideoUrl()} type="video/mp4" />
	    </video>
    )
  }
}

BackgroundVideo.propTypes = {
  theme: PropTypes.string.isRequired
}

export default BackgroundVideo