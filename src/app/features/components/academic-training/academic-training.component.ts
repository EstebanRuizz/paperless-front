import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-academic-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './academic-training.component.html',
  styleUrls: ['./academic-training.component.scss']
})
export class AcademicTrainingComponent implements OnInit {
  academicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.academicForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit(): void {
    if (this.academicForm.invalid) {
      this.academicForm.markAllAsTouched();
      return;
    }

    const formData = this.academicForm.value;
    console.log('Academic Form Data:', formData);
  }

  get f() {
    return this.academicForm.controls;
  }
}
