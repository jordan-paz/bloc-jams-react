import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : null
    }
  }

  render() {
    return (
    <div>
      <div className="hero is-primary">
        <div className="hero-body">
            <h1 class="title is-size-1 has-text-centered">Bloc Jams</h1>
            <h2 class="subtitle has-text-centered">Turn the Music Up!</h2>
        </div>
        <div className="tabs is-centered">
          <ul>
            <li><a><Link to='/'>Landing</Link></a></li>
            <li><a><Link to='/library'>Library</Link></a></li>
          </ul>
        </div>
      </div>
      <div>
        <main>
          <Route exact path="/" component={Landing} />
          <Route exact path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    </div>
    );
  }
}

export default App;
