import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import mixpanel from "mixpanel-browser";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { BankStatementStateService } from "../services/bank-statement-state.service";

@Component({
    selector: "app-bank-statement-upload",
    templateUrl: "./bank-statement-upload.component.html",
    styleUrls: ["./bank-statement-upload.component.scss"]
})
export class BankStatementUploadComponent implements OnInit {
    public form: FormGroup;
    public errorMessage: string = null;
    public fileName: string = null;
    public loading: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private bankStatementStateService: BankStatementStateService,
        private router: Router,
        private toastr: ToastrService,
        private translateService: TranslateService) { }

    ngOnInit(): void {
        mixpanel.track("bankStatementUpload:begin");
        this.form = this.formBuilder.group({
            uploadFile: [null, Validators.required]
        });
    }

    async handleFileInputChange(files: FileList) {
        if (files.length < 1) {
            this.errorMessage = null;
            this.fileName = null;
            return;
        }
        
        if (!this.bankStatementStateService.setFile(files[0])) {
            this.errorMessage = await this.translateService.get("bankStatementUploadComponent.errorFileTooBig").toPromise();
            this.fileName = null;
        } else {
            this.errorMessage = null;
            this.fileName = files[0].name;
        }
    }

    async submit() {
        if (this.form.invalid || this.fileName === null || this.fileName === undefined) {
            this.toastr.warning(await this.translateService.get("bankStatementUploadComponent.errorPleaseSelectFile").toPromise());
            return;
        }
        this.loading = true;
        this.router.navigate(['/', 'onboarding', 'bank-statement', { outlets: { 'onboarding-outlet': ['complete'] } }]);
    }
}