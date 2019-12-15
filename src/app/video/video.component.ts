import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

import videojs from 'video.js';
import 'videojs-playlist';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video', {static: false}) video: ElementRef;
  @Input() src: any;
  @Input() poster: string;
  @Input() playlist: any[];

  player: any;

  constructor() {}

  ngAfterViewInit() {
    this.player = videojs(this.video.nativeElement);
    if (this.playlist) {
      this.player.playlist(this.playlist);
      this.player.playlist.autoadvance(0);
      if (this.playlist.length > 1) {
        const Button = videojs.getComponent('Button');

        const PreviousButton = videojs.extend(Button, {
          constructor: function(player, options) {
            Button.call(this, player, options);
            this.controlText('Previous');
          },
          buildCSSClass: function() {
            return `vjs-previous-control ${Button.prototype.buildCSSClass.call(this)}`;
          },
          handleClick: event => {
            this.player.playlist.previous();
          }
        });
        videojs.registerComponent('PreviousButton', PreviousButton);
        this.player.controlBar.addChild('PreviousButton', {}, 0);

        const NextButton = videojs.extend(Button, {
          constructor: function(player, options) {
            Button.call(this, player, options);
            this.controlText('Next');
          },
          buildCSSClass: function() {
            return `vjs-next-control ${Button.prototype.buildCSSClass.call(this)}`;
          },
          handleClick: event => {
            this.player.playlist.next();
          }
        });
        videojs.registerComponent('NextButton', NextButton);
        this.player.controlBar.addChild('NextButton', {}, 2);
      }
    } else {
      this.player.src(this.src);
      this.player.poster(this.poster);
    }
  }
}
