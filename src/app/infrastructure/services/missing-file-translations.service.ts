import { Injectable } from '@angular/core';
import { MissingTranslationHandlerParams, MissingTranslationHandler } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';

@Injectable()
export class MissingFileTranslationsHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): Observable<string> {
    if (!params || !params.key) {
      return of(`No translation found for key ${params.key} for language ${params.translateService.currentLang}`);
    }
    // we dont care if uppercase or lowercase
    var currentLanguageTranslations = params.translateService.translations[params.translateService.currentLang];
    if (!currentLanguageTranslations) {
      return of(`No translation found for key ${params.key} for language ${params.translateService.currentLang}`);
    }

    var matchedKey = Object.keys(currentLanguageTranslations).find(key => key.toLowerCase() === params.key.toLowerCase());
    if (!matchedKey) {
      return of(`No translation found for key ${params.key} for language ${params.translateService.currentLang}`);
    }

    return of(currentLanguageTranslations[matchedKey]);
  }
}
