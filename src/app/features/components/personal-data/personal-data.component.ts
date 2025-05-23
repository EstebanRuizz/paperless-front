import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Tesseract from 'tesseract.js';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment';
import { APIResponse } from '../../interfaces/APIResponse';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class PersonalDataComponent {
    public extractedText: string = '';
    public isLoading: boolean = false;

    public constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    public onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.runOCR(file);
        }
    }

    public goHome(): void {
        this.router.navigate(['']);
    }

    protected runOCR(file: File) {
        this.isLoading = true;
        Tesseract.recognize(file, 'spa', {
            logger: (m) => console.log(m)
        })
            .then((result) => {
                this.extractedText = result.data.text;
                this.isLoading = false;
            })
            .catch((err) => {
                console.error('OCR Error:', err);
                this.isLoading = false;
            });
    }

    public generateCV() {
        this.http
            .post<APIResponse<{ Id: string }>>(`${environment.apiUrl}/curriculum/cv-orc`, {
                Text: this.extractedText
            })
            .subscribe({
                next: (response) => {
                    this.router.navigate(['interview', response.data.pop()?.Id]);
                },
                error: (error) => {
                    console.error('Error submitting form:', error);
                }
            });
    }
}
