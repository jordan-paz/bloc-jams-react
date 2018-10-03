import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
  render () {
    return (
        <div className = "container is-fluid">
          <div className="hero is-dark">
            <h1 className="title has-text-centered">Library</h1>
        </div>
        <div className="box has-background-white-ter">
          {
            this.state.albums.map( (album, index) =>

              <Link className="box has-background-white-ter" to={`/album/${album.slug}`} key={index}>
                <div className="media">
                  <div className="media-left">
                    <img className="image is-128x128" src={album.albumCover} alt={album.title} />
                    </div>
                  <div className="media-content">
                      <div className="title">{album.title}</div>
                      <div className="subtitle">by {album.artist}</div>
                      <div>{album.songs.length} songs</div>
                  </div>
                </div>
              </Link>
            )
           }
        </div>
      </div>
    );
  }
}

export default Library;
