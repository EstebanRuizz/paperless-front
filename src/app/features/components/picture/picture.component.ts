import Tesseract from 'tesseract.js';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIResponse } from '../../interfaces/APIResponse';
import { environment } from '../../../../environment';

@Component({
    selector: 'app-picture',
    templateUrl: './picture.component.html',
    styleUrls: ['./picture.component.scss'],
    imports: [CommonModule]
})
export class PictureComponent implements AfterViewInit {
    @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    photoDataUrl: string | null = null;
    extractedText: string = '';
    isExtractingText: boolean = false;

    public constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {}

    ngAfterViewInit() {
        this.requestCameraAccess();
    }

    async requestCameraAccess() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.videoRef.nativeElement.srcObject = stream;
        } catch (err) {
            alert('Camera access was denied or not available.');
            console.error(err);
        }
    }

    capture() {
        const video = this.videoRef.nativeElement;
        const canvas = this.canvasRef.nativeElement;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        this.photoDataUrl = canvas.toDataURL('image/png');

        this.runOCRFromPhoto();
    }

    runOCRFromPhoto() {
        if (!this.photoDataUrl) return;

        this.isExtractingText = true;
        this.extractedText = '';

        Tesseract.recognize(this.photoDataUrl, 'spa', {
            logger: (m) => console.log(m)
        })
            .then((result) => {
                this.extractedText = result.data.text;
                this.isExtractingText = false;
            })
            .catch((err) => {
                console.error('OCR Error:', err);
                this.isExtractingText = false;
            });
    }

    public goHome(): void {
        this.router.navigate(['']);
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
