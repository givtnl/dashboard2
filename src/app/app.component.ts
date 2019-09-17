import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styles: []
})
export class AppComponent {

	public isProduction = environment.production;

	constructor(languageService: TranslateService) {
		languageService.addLangs([ 'en', 'nl' ]);
		languageService.setDefaultLang('en');

		const browserLang = languageService.getBrowserLang();
		languageService.use(browserLang.match(/en|nl/) ? browserLang : 'en');
	}
}
