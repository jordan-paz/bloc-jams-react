import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <ion-icon name="skip-backward"></ion-icon>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span>{this.props.isPlaying ? <ion-icon name="pause"></ion-icon> : <ion-icon name="play"></ion-icon>}</span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <ion-icon name="skip-forward"></ion-icon>
          </button>
        </section>
        <section id="time-control">
         <div className="current-time">{this.props.displayCurrentTime}</div>
          <input
           type="range"
           className="seek-bar"
           value={(this.props.currentTime / this.props.duration) || 0}
           max="1"
           min="0"
           step="0.01"
           onChange={this.props.handleTimeChange}
          />
         <div className="total-time">{this.props.displayDuration}</div>
        </section>
        <section id="volume-control">
          <div className="volume">{this.props.volume * 100}</div>
          <input
            type="range"
            className="volume-bar"
            value={this.props.volume || 0}
            onChange={this.props.handleVolumeChange}
            max = "1"
            min = "0"
            step = ".1"
            />
        </section>
       </section>
     );
   }
 }

 export default PlayerBar;
