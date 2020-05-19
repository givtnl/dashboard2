import {
    AbstractControl,
    ValidationErrors,
    AsyncValidatorFn
} from '@angular/forms';

import { Observable, timer } from 'rxjs';
import { CollectGroupsService } from '../services/collect-groups.service';
import { map, delay, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

export class UniqueCollectGroupNameValidator {

    static create(service: CollectGroupsService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(1000)
                .pipe(switchMap(() => service.search(control.value)))
                .pipe(map(results => !results || results.length === 0 ? null : {
                    unique: true
                }));
        }
    }
}