import React, {PureComponent} from 'react'
import './BackgroundVideo.css' 

class BackgroundVideo extends PureComponent {
	constructor (props) {
		super(props)

		// In a real world scenario, this would come from the backend counting the number of files in the directory
		this.darkSourcesLength = 3
		this.lightSourcesLength = 2

		this.state = {
			randomVideo: 1
		}
	}

	componentDidUpdate () {
		const arrayLength = this.props.theme === "light" ? this.lightSourcesLength : this.darkSourcesLength

		this.setState({
			randomVideo: Math.floor(Math.random()*arrayLength) + 1
		})
	}

  render () {
    return (
      <video autoPlay muted loop className="BackgroundVideo">
	      <source src={process.env.PUBLIC_URL + "/video/" + this.props.theme + "-" + this.state.randomVideo +".mp4"} type="video/mp4" />
	    </video>
    )
  }
}

export default BackgroundVideo