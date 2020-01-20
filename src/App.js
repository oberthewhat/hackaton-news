import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      input: "",
      storyTitle: ""
    };
  }

  onChange=(e) => {
    this.setState({
      input: e.target.value
    })
  }


  onSubmit= e =>  {
    e.preventDefault()
    this.setState ({
      storyTitle: this.state.stories.map(articles => {
      return articles.story_title
      }),
      input: ""
    })

  }

  
  
  async componentDidMount() {
    try{
      const response = await fetch("http://hn.algolia.com/api/v1/search_by_date?query=...")
      const stories = await response.json()
    // .then(response => response.json())
    this.setState({ stories: stories.hits })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.state.stories)
    console.log(this.state.storyTitle) 
    return (
      <div>
        <form className="example" onSubmit={this.onSubmit}>
        <input type="text" name="search" onChange={this.onChange}/>
        <button type="submit">Search</button>
        </form>
        {this.state.stories.map((articles) =>
        <>
         <h3>{articles.story_title}</h3>
         <li key={articles.objectID}>{articles.author}</li> 
        <a href={articles.story_url} key={articles.story_url}>{articles.story_url}</a>
        </>
        )}
      </div>
    );

  }
}

export default App;
