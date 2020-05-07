import {
    AbstractControl,
    ValidationErrors,
    AsyncValidatorFn
} from '@angular/forms';

import { Observable } from 'rxjs';
import { CollectGroupsService } from '../services/collect-groups.service';
import { map, delay } from 'rxjs/operators';

export class UniqueCollectGroupNameValidator {

    static create(service: CollectGroupsService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return service.search(control.value)
                .pipe(delay(1000))
                .pipe(map(results => !results || results.length === 0 ? null : {
                    unique: true
                }));
        }
    }
}