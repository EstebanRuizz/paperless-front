import { Routes } from '@angular/router';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { PictureComponent } from './app/features/components/picture/picture.component';
import { InterviewComponent } from './app/features/components/interview/interview.component';
import { PersonalDataComponent } from './app/features/components/personal-data/personal-data.component';

export const appRoutes: Routes = [
    { 
        path: '', component
        : Landing 
    },
    { 
        path: 'interview', 
        component: InterviewComponent 
    },
    {
        path: 'interview/:orcId',
        component: InterviewComponent
    },
    { 
        path: 'personal-data', 
        component: 
        PersonalDataComponent 
    },
    { 
        path: 'take-picture', 
        component: 
        PictureComponent 
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
