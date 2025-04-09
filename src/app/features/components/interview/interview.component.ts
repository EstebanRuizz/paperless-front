import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-interview',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './interview.component.html',
    styleUrl: './interview.component.scss'
})
export class InterviewComponent {
    form!: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        const orcId = this.route.snapshot.paramMap.get('orcId');
        if (orcId) {
            console.log('Interview for ORCID:', orcId);
            // Load specific interview data
        } else {
            console.log('General interview route');
            // Show general view
        }

        this.form = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            address: [''],
            profile: ['', Validators.required],
            degree: ['', Validators.required],
            institution: ['', Validators.required],
            startDate: [''],
            endDate: [''],
            position: ['', Validators.required],
            company: ['', Validators.required],
            startDateJob: [''],
            endDateJob: [''],
            currentJob: [false],
            responsibilities: [''],
            professionalSkills: ['', Validators.required],
            languages: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        console.log(this.form.value);
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const formData = {
            fullName: this.form.value.fullName,
            emailAddress: this.form.value.email,
            phone: this.form.value.phone,
            Address: this.form.value.address,
            professionalProfile: this.form.value.profile,
            certifiedTittle: this.form.value.degree,
            institution: this.form.value.institution,
            studyStartDate: this.form.value.startDate,
            studyEndDate: this.form.value.endDate,
            jobPosition: this.form.value.position,
            company: this.form.value.company,
            companyStartDate: this.form.value.startDateJob,
            companyEndDate: this.form.value.endDateJob,
            professionalSkills: this.form.value.professionalSkills,
            languages: this.form.value.languages
        };

        this.http.post('http://localhost:3003/curriculum', formData).subscribe({
            next: (response) => {
                console.log('Successfully submitted:', response);
                this.router.navigate(['landing']);
            },
            error: (error) => {
                console.error('Error submitting form:', error);
            }
        });

        this.generateCV();
    }

    private generateCV(): void {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Curriculum Vitae', 20, 20);

        doc.setFontSize(12);
        let y = 30;
        const lineHeight = 8;

        const lines = [
            `Full Name: ${this.form.value.fullName}`,
            `Email: ${this.form.value.email}`,
            `Phone: ${this.form.value.phone}`,
            `Address: ${this.form.value.address}`,
            `Profile: ${this.form.value.profile}`,
            '',
            'Education:',
            ` - ${this.form.value.degree} at ${this.form.value.institution}`,
            `   (${this.form.value.startDate} - ${this.form.value.endDate})`,
            '',
            'Work Experience:',
            ` - ${this.form.value.position} at ${this.form.value.company}`,
            `   (${this.form.value.startDateJob} - ${this.form.value.endDateJob})`,
            '',
            `Skills: ${this.form.value.professionalSkills}`,
            `Languages: ${this.form.value.languages}`
        ];

        for (const line of lines) {
            doc.text(line, 20, y);
            y += lineHeight;
        }

        doc.save(`${this.form.value.fullName.replace(/\s+/g, '_')}_CV.pdf`);
    }

    get f() {
        return this.form.controls;
    }
}
