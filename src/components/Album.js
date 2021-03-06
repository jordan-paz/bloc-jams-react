import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';



class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[7],
       currentTime: null,
       duration: album.songs[0].duration,
       volume: 0,
       isPlaying: false,
       currentHover: null,
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }

   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumechange: e => {
         this.setState({ volume: this.audioElement.volume })
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   }

   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }

   handleMouseEnter(song) {
      this.setState({currentHover : song})
   }

   handleMouseLeave() {
    this.setState({currentHover : null})
   }

   buttonDisplay(song, index) {
     if(this.state.currentSong === song && !this.state.isPlaying){
       return <ion-icon name="play"></ion-icon>
     }
     if(this.state.currentSong === song){
       return <ion-icon name="pause"></ion-icon>
     }
     else if (this.state.currentHover === song) {
       return <ion-icon name="play"></ion-icon>
     }
     else {
       return index + 1
     }
   }

   handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
   }

   handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(4, currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }

   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

   handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.volume = newVolume;
     this.setState({ volume: newVolume });
   }

   formatTime(time) {
     let minutes = Math.floor(time / 60);
     let seconds = Math.floor(time - minutes * 60);
     if (isNaN(time)) {
       return "-:--"
     }
     else if (seconds < 10){
       return minutes.toString() + ":0" + seconds.toString()
     }
     else {
     return minutes.toString() + ":" + seconds.toString()
     }
   }

  render () {
    return(
    <div>
         <section className="hero-body">
           <div className="media">
             <img className="media-left image is-128x128" src={this.state.album.albumCover} alt={this.state.album.title}/>
             <div className="album-details">
               <h1 id="album-title">{this.state.album.title}</h1>
               <h2 className="artist">{this.state.album.artist}</h2>
               <div id="release-info">{this.state.album.releaseInfo}</div>
             </div>
             <div className="media-right">
              <PlayerBar
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  displayCurrentTime={this.formatTime(this.audioElement.currentTime)}
                  displayDuration={this.formatTime(this.audioElement.duration)}
                  currentTime={this.formatTime(this.audioElement.currentTime)}
                  duration={this.formatTime(this.audioElement.duration)}
                  volume={this.audioElement.volume}
                  handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={() => this.handlePrevClick()}
                  handleNextClick={() => this.handleNextClick()}
                  handleTimeChange={(e) => this.handleTimeChange(e)}
                  handleVolumeChange={(e) => this.handleVolumeChange(e)}
                />
             </div>
           </div>
         </section>
       <table className="table is-striped is-fullwidth">
          <tbody>
          {this.state.album.songs.map( (song, index) =>
             <tr
               key={index}
               onClick={() => this.handleSongClick(song)}
               onMouseEnter={() => this.handleMouseEnter(song)}
               onMouseLeave={() => this.handleMouseLeave()} >
                  <td>{this.buttonDisplay(song, index)}</td>
                  <td>{song.title}</td>
                  <td>{this.formatTime(song.duration)}</td>
              </tr>
             )}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Album;
