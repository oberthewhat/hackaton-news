import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      author: "",
    };
  }

  authorSearch= (e) =>  {
    e.preventDefault()
    this.authorQuery()

  }

  authorChange= (e) => {
    e.preventDefault()
    this.setState({author: e.target.value})
  }

  authorQuery() {
    fetch(`http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.author}`)
    .then( res => res.json())
    .then( d => this.setState({stories: d.hits}))
  }
  
  render() {
    console.log(this.state.stories)
    return (
        <div>
          <form onSubmit={this.authorSearch}>
            Search by Author:<input value={this.state.author} onChange={this.authorChange} />
            <button type="submit">Search</button>
          </form>

          {this.state.stories.map((matches) => 
          <div className="resultCard">
          <li className="titles" key={matches.created_at_i}>{matches.title}</li>
          <li key={matches.objectID}>Date: {matches.created_at}</li>
          <a href={matches.url} key={matches.url}>{matches.url}</a>
          </div>
          )}
        </div>
    );

  }
}

export default App;
