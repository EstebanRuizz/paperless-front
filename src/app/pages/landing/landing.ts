import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { HighlightsWidget } from './components/highlightswidget';
import { PricingWidget } from './components/pricingwidget';
import { FooterWidget } from './components/footerwidget';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, HeroWidget, FeaturesWidget, HighlightsWidget, PricingWidget, FooterWidget, RippleModule, StyleClassModule, ButtonModule, DividerModule],
    template: `
        <section id="digitaliza-cv" class="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
            <!-- Contenido principal -->
            <div class="w-full md:w-1/2 space-y-8 text-center md:text-left">
                <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">Digitaliza tu <br class="hidden md:inline" />CV</h2>
                <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition" routerLink="/interview">Hacer entrevista</button>
                    <button class="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition" routerLink="/personal-data">Subir archivo</button>
                    <button class="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition" routerLink="/take-picture">Tomar foto</button>
                </div>
            </div>

            <div class="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center md:items-end space-y-4">
                <img src="https://th.bing.com/th/id/OIP.At0dq-3elWSf-TcvUfqvbgHaGW?rs=1&pid=ImgDetMain" alt="Ejemplos de CV" class="w-full max-w-md rounded-xl shadow-md" />
                <div class="bg-gray-50 p-4 rounded-xl text-center text-gray-700 text-sm max-w-md">
                    <p>
                        Digitaliza y guarda de forma rápida tu hoja de vida<br />
                        Sube un archivo o responde unas preguntas para generar tu CV Digital!
                    </p>
                </div>
            </div>
        </section>
    `
})
export class Landing {}
