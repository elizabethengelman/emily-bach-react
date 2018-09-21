import React from 'react';
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

  componentDidMount() {
    this.fetchImages().then(response=>{
        response.json().then(data => {
          console.log(data)
          let pics = data.data.allImages.nodes.map((pic, index) => {
            return(
              <div key={index} className="gallery">
                <a href={pic.url}>
                  <img alt="" src={pic.url}/>
                </a>
              </div>
            )
          })
         this.setState({pictures: pics})
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
