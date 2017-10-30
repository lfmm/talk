import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { LayoutState, initialLayoutState } from '../core';
import { NavOptionsBase, NavOption } from '../core';

import { ConfigService } from '../core';

import { RouterService } from '../core';
import { CoreService } from '../core';

import { TranslationService } from '../core';

@Component({
  selector: 'is-talk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _cLangSubscription: Subscription;

  layoutState: LayoutState = initialLayoutState;

  public options: NavOptionsBase;

  private _themeSubscription: Subscription;
  public theme: string;

  constructor(private _cfg: ConfigService, private _rs: RouterService, private _ts: TranslationService, public _cs: CoreService) {
    // initialize translation services
    this._ts.start();
    // initialize router services
    this._rs.start();
  }

  ngOnInit() {
    // observe selected theme
    this._themeSubscription = this._cs.currentTheme.subscribe((t) => {
      // current theme
      this.theme = t;
    });
    // create nav options through cLangSubscription (when language changes, so do nav descriptions and so...)
    this.options = new NavOptionsBase();
    this._cLangSubscription = this._ts.CurrentLanguage.subscribe((c) => {
      // get translations and add the respective items
      this._ts.getTranslation('NAV').subscribe((t) => {
        // clear all items
        this.options.clearAllOptions(true);
        // add translated options
        this.options.addOption({name: t.TALK ? t.TALK : 'talk', tooltip: 'Do you want to talk?',
          route: ['talk'], action: null, icon: 'fa-exchange' });
        this.options.addOption({name: t.TRACK ? t.TRACK : 'track', tooltip: 'Track your talks and conclusions!',
          route: null, action: null, icon: 'fa-tree' });
        this.options.addOption({name: t.LEARN ? t.LEARN : 'learn', tooltip: 'Learn from what you talked about!',
          route: null, action: null, icon: 'fa-university' });
        this.options.addOption({name: t.RELAX ? t.RELAX : 'relax', tooltip: 'Take a minute or two...',
          action: null, route: null, icon: 'fa-smile-o' });
        this.options.addOption({name: t.TRANSLATE ? t.TRANSLATE : 'translate', tooltip: 'Translate this app...',
          action: null, route: ['translate'], icon: 'fa-book' });
      });
    });
  }

  ngOnDestroy() {
    if (this._cLangSubscription) { this._cLangSubscription.unsubscribe(); }
    if (this._themeSubscription) { this._themeSubscription.unsubscribe(); }
  }

  public navClick = (what: NavOption) => {
    if (what && what.route && what.route.length > 0) {
      this._rs.go(what.route);
    }
  }

  public logoClick = () => {
    this._rs.go(['']);
  }

  public changeLang = (lang: string) => {
    this._cs.changeLanguage(lang);
  }

  public goBack = () => {
    this._rs.back();
  }

  public goForward = () => {
    this._rs.forward();
  }

}
