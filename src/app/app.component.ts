import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import * as mixpanel from 'mixpanel-browser'

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styles: []
})
export class AppComponent {

	public isProduction = environment.production;

	constructor(languageService: TranslateService) {
		languageService.addLangs([ 'en', 'nl', 'de' ]);
		languageService.setDefaultLang('en');

		const browserLang = languageService.getBrowserLang();
        languageService.use(browserLang.match(/en|nl|de/) ? browserLang : 'en');
        
        mixpanel.init("90a430d734b14dbe1393430682a103a1", { ignore_dnt: true });
	}
}
