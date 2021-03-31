import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
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
        this.form = this.formBuilder.group({
            uploadFile: [null, Validators.required]
        });
    }

    handleFileInputChange(files: FileList) {
        if (!this.bankStatementStateService.setFile(files[0])) {
            this.errorMessage = "File size too big";
            this.fileName = null;
        } else {
            this.errorMessage = null;
            this.fileName = files[0].name;
        }
    }

    async submit() {
        if (this.form.invalid || this.fileName === null || this.fileName === undefined) {
            this.toastr.show(await this.translateService.get("You should really select a file.").toPromise());
            return;
        }
        this.loading = true;
        this.router.navigate(['/', 'onboarding', 'bank-statement', { outlets: { 'onboarding-outlet': ['complete'] } }]);
    }
}