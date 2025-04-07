import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
    imports: [ReactiveFormsModule]
})
export class PersonalDataComponent implements OnInit {
    cvForm!: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.cvForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            address: [''],
            profile: ['', Validators.required],
            degree: ['', Validators.required],
            institution: ['', Validators.required],
            startDate: [''],
            endDate: [''],
        });
    }

    public onSubmit(): void {
        if (this.cvForm.invalid) {
            this.cvForm.markAllAsTouched();
            return;
        }

        const formData = this.cvForm.value;
        console.log(formData);
        
        // this.http.post('https://tu-api.com/cv', formData).subscribe({
        //     next: (response) => console.log('Respuesta:', response),
        //     error: (error) => console.error('Error al enviar:', error)
        // });

        // this.router.navigate(['/academic-training']);
        this.router.navigate(['landing']);
    }

    get f() {
        return this.cvForm.controls;
    }
}
