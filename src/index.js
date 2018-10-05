import React from 'react';
import { Slide } from 'react-slideshow-image';
import ReactDOM from 'react-dom';
import './index.css';

class Title extends React.Component {
  render() {
    return(
      <div>
        <h1>Bride & Boozy</h1>
        <h2>Celebrating Emily's Bachelorette Weekend</h2>
      </div>
    )
  }
}


const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
}

class Background extends React.Component {
  constructor() {
    super()
    this.state = {
      pictures: []
    };
  }


  fetchImages() {
    var url = "http://localhost:5000/graphql"
    var query = { "query":"{allImages{nodes{url}}}" }
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(query)
    })
  }

  getSlides(slideImages) {
    var slideShow = slideImages.map((pic, index) => (
        <div key={index} className="each-slide">
          <div className="image" style={{'backgroundImage': `url(${pic.url})`}}></div>
        </div>
      ))

    return (
      <Slide {...properties}>
        {slideShow}
      </Slide>
    )
  }

  componentDidMount() {
    this.fetchImages().then(response=>{
        response.json().then(data => {
          let pics = data.data.allImages.nodes
          let slides = this.getSlides(pics)
         this.setState({pictures: slides})
        })
     })
  }

  render() {
    return(this.state.pictures)
  }
}

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
  }

  renderTitle() {
    return <Title />;
  }

  renderBackground() {
     return  <Background />;
  }

  render() {
    return(
      <div>
        {this.renderTitle()}
        {this.renderBackground()}
      </div>
    )
  }
}



const App = () => (
  <PhotoGallery />
)

ReactDOM.render((
  <App />
), document.getElementById('root'));
