import { Component, OnInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../../buy/popup/popup.component';

@Component({
  selector: 'app-text-ads',
  templateUrl: './text-ads.component.html',
  styleUrls: ['./text-ads.component.sass']
})
export class TextAdsComponent implements OnInit {

  public textCarousel: NguCarousel;
  public slides: any[] = [];
  public constructor(
    private _dialog: MatDialog
  ) {
    this.textCarousel = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 3,
      speed: 500,
      point: {
        visible: false
      },
      interval: 5000,
      touch: false,
      loop: true
    };
  }

  public ngOnInit() {
    this.slides = [
      {
        label: 'Affiliate Marketing Crypto Profit Sharing',
        text: `JOIN ICO NOW! Click Here`
      },
      {
        label: 'Crest Token - Crypto Profit Sharing',
        text: `ICO is Now Live. Join Today `
      },
      {
        label: 'Crypto Profit Sharing With AI',
        text: `Join ICO Now. Selling FAST! Click Here`
      },
      {
        label: 'WOW. Crypto Cash Daily.',
        text: `Crest Token. ICO NOW LIVE. Click Here`
      },
      {
        label: 'Crest DigiAd Platform.',
        text: `Crypto Profit Sharing. Join Live ICO.`
      },
      {
        label: 'Affiliate Marketing AI Profit Sharing.',
        text: `Earn Cash with Crest. Join ICO. Click Here`
      },
      {
        label: 'Crypto Cash Daily with Crest.',
        text: `ICO is on FIRE! Click Here`
      },
      {
        label: 'Daily Passive Crypto 1.15-2.25% Daily',
        text: `Guaranteed ICO - LIMITED SPOTS`
      },
      {
        label: 'ALERT: Daily Passive Income Daily',
        text: `Meet The Team`
      },
      {
        label: 'ALERT: 1.15% to 2.25% Paid Daily.',
        text: `Proven + Guaranteed!JOIN ICO NOW!`
      },
      {
        label: 'LIMITED! Grab $92.50 in FREE Tokens.',
        text: `Crest Platform Pre-ICO is almost SOLD OUT!`
      }
    ];
  }

  public openPopupCopyText() {
    this._dialog.open(PopupComponent, {
      data: {
        iconClose: 'icon-close',
        iconClass: 'icon-tick',
        message: 'The text has been copied to the clipboard',
      }
    });
  }
}
