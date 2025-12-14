/**
 * Visor de PDF usando PDF.js
 * Renderiza PDFs en canvas para compatibilidad total con móviles
 */

// Configuración de PDF.js desde CDN
const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Inicializar PDF.js cuando cargue
function initPDFViewer() {
    // Configurar worker de PDF.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
}

// Clase del visor de PDF
class PDFViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.pdfDoc = null;
        this.currentPage = 1;
        this.totalPages = 0;
        this.scale = 1.5;
        this.rendering = false;
        this.pendingPage = null;

        this.setupControls();
    }

    setupControls() {
        // Los controles se crean dinámicamente en el HTML
    }

    async loadPDF(url) {
        try {
            // Mostrar loading
            this.showLoading();

            // Cargar el PDF
            const loadingTask = pdfjsLib.getDocument(url);
            this.pdfDoc = await loadingTask.promise;
            this.totalPages = this.pdfDoc.numPages;
            this.currentPage = 1;

            // Actualizar UI
            this.updatePageInfo();

            // Renderizar primera página
            await this.renderPage(this.currentPage);

            // Ocultar loading
            this.hideLoading();

            return true;
        } catch (error) {
            console.error('Error cargando PDF:', error);
            this.showError('No se pudo cargar el PDF. Por favor intenta de nuevo.');
            return false;
        }
    }

    async renderPage(pageNum) {
        if (this.rendering) {
            this.pendingPage = pageNum;
            return;
        }

        this.rendering = true;

        try {
            const page = await this.pdfDoc.getPage(pageNum);

            // Obtener canvas
            const canvas = this.container.querySelector('#pdf-canvas');
            const ctx = canvas.getContext('2d');

            // Calcular escala para ajustar al contenedor
            const containerWidth = this.container.offsetWidth - 20; // padding
            const viewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale: Math.min(scale, 2) });

            // Ajustar canvas
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            // Renderizar
            const renderContext = {
                canvasContext: ctx,
                viewport: scaledViewport
            };

            await page.render(renderContext).promise;

            this.rendering = false;
            this.currentPage = pageNum;
            this.updatePageInfo();

            // Si hay página pendiente, renderizarla
            if (this.pendingPage !== null) {
                const pending = this.pendingPage;
                this.pendingPage = null;
                this.renderPage(pending);
            }
        } catch (error) {
            console.error('Error renderizando página:', error);
            this.rendering = false;
        }
    }

    prevPage() {
        if (this.currentPage <= 1) return;
        this.renderPage(this.currentPage - 1);
    }

    nextPage() {
        if (this.currentPage >= this.totalPages) return;
        this.renderPage(this.currentPage + 1);
    }

    goToPage(pageNum) {
        if (pageNum < 1 || pageNum > this.totalPages) return;
        this.renderPage(pageNum);
    }

    zoomIn() {
        this.scale = Math.min(this.scale + 0.25, 3);
        this.renderPage(this.currentPage);
    }

    zoomOut() {
        this.scale = Math.max(this.scale - 0.25, 0.5);
        this.renderPage(this.currentPage);
    }

    updatePageInfo() {
        const pageInfo = this.container.querySelector('#page-info');
        if (pageInfo) {
            pageInfo.textContent = `${this.currentPage} / ${this.totalPages}`;
        }

        // Actualizar botones
        const prevBtn = this.container.querySelector('#prev-page');
        const nextBtn = this.container.querySelector('#next-page');

        if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
        if (nextBtn) nextBtn.disabled = this.currentPage >= this.totalPages;
    }

    showLoading() {
        const loading = this.container.querySelector('#pdf-loading');
        const canvasContainer = this.container.querySelector('#canvas-container');
        if (loading) loading.classList.remove('hidden');
        if (canvasContainer) canvasContainer.classList.add('hidden');
    }

    hideLoading() {
        const loading = this.container.querySelector('#pdf-loading');
        const canvasContainer = this.container.querySelector('#canvas-container');
        if (loading) loading.classList.add('hidden');
        if (canvasContainer) canvasContainer.classList.remove('hidden');
    }

    showError(message) {
        const loading = this.container.querySelector('#pdf-loading');
        if (loading) {
            loading.innerHTML = `
                <div class="text-center text-red-400">
                    <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Variable global para el visor
let pdfViewer = null;

// Función para inicializar el visor desde Alpine
function initPdfViewer(containerId) {
    if (!pdfViewer) {
        pdfViewer = new PDFViewer(containerId);
    }
    return pdfViewer;
}

// Función para cargar un PDF
async function loadPdfInViewer(url) {
    if (!pdfViewer) {
        console.error('PDF Viewer no inicializado');
        return false;
    }
    return await pdfViewer.loadPDF(url);
}
