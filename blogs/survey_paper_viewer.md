---
layout: default
title: Survey Paper Viewer
description: View my survey paper on robot skills and future directions
---

# Survey Paper: Robot Skills & Future Directions

View the PDF below without needing to download it. Scroll naturally through the document just like a native PDF viewer:

<style>
  #pdf-viewer {
    position: relative;
    width: 100%;
    margin: 20px 0;
    background: #f5f5f5;
  }
  
  #pdf-controls {
    padding: 12px;
    background: #f0f0f0;
    border-radius: 4px 4px 0 0;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #ddd;
  }
  
  button {
    padding: 8px 16px;
    cursor: pointer;
    background: #0366d6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }
  
  button:hover {
    background: #0256c7;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  #page-info {
    font-size: 14px;
    font-weight: 500;
  }
  
  #pdf-container {
    height: 800px;
    overflow-y: scroll;
    overflow-x: auto;
    background: #525252;
    padding: 10px;
    border-radius: 0 0 4px 4px;
  }
  
  #pdf-pages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .pdf-page {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    border-radius: 2px;
  }
  
  .pdf-page canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  /* Smooth scrollbar */
  #pdf-container::-webkit-scrollbar {
    width: 12px;
  }
  
  #pdf-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  #pdf-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
  }
  
  #pdf-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

<div id="pdf-viewer">
  <div id="pdf-controls">
    <input type="number" id="page-goto" min="1" style="width: 70px; padding: 6px;" placeholder="Page #">
    <span id="page-info">Page <span id="current-page">1</span> of <span id="total-pages">0</span></span>
    <button id="zoom-out">Zoom Out</button>
    <button id="zoom-in">Zoom In</button>
    <button id="reset-zoom">Reset Zoom</button>
    <span id="zoom-level" style="font-size: 14px; font-weight: 500;">100%</span>
    <a id="download-link" href="./robot_skill_future.pdf" download style="margin-left: auto;">
      <button>Download PDF</button>
    </a>
  </div>
  <div id="pdf-container">
    <div id="pdf-pages"></div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

<script>
  let pdfDoc = null;
  let zoomLevel = 1.0;
  let BASE_ZOOM = 1.0;
  const pageCanvases = [];
  let currentPageInView = 1;

  // Set up PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Update zoom level display
  function updateZoomDisplay() {
    const percentage = Math.round(zoomLevel * 100);
    document.getElementById('zoom-level').textContent = percentage + '%';
  }

  // Calculate fit-to-width zoom level
  function calculateFitToWidthZoom() {
    if (!pdfDoc) return 1.5;
    
    return pdfDoc.getPage(1).then(function(page) {
      const containerWidth = document.getElementById('pdf-container').clientWidth - 20; // accounting for padding
      const viewport = page.getViewport({ scale: 1 });
      const fitScale = (containerWidth / viewport.width) * 1.3; // 1.3x multiplier for higher resolution
      zoomLevel = fitScale;
      BASE_ZOOM = fitScale;
      return fitScale;
    });
  }

  // Load the PDF and render all pages
  function loadPdf() {
    const pdfUrl = './robot_skill_future.pdf';
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
      pdfDoc = pdf;
      document.getElementById('total-pages').textContent = pdf.numPages;
      
      // Calculate fit-to-width zoom, then render all pages
      calculateFitToWidthZoom().then(function() {
        updateZoomDisplay();
        renderAllPages();
      });
    }).catch(function(error) {
      document.getElementById('pdf-container').innerHTML = '<p style="padding: 20px; color: red;">Error loading PDF. Please try downloading it directly.</p>';
      console.error('Error loading PDF:', error);
    });
  }

  // Render all pages
  function renderAllPages() {
    const pagesContainer = document.getElementById('pdf-pages');
    pagesContainer.innerHTML = '';
    pageCanvases.length = 0;

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const pageDiv = document.createElement('div');
      pageDiv.className = 'pdf-page';
      pageDiv.dataset.pageNum = pageNum;
      
      const canvas = document.createElement('canvas');
      canvas.id = 'page-' + pageNum;
      
      pageDiv.appendChild(canvas);
      pagesContainer.appendChild(pageDiv);
      pageCanvases.push(canvas);
      
      renderPage(pageNum, canvas);
    }
  }

  // Render a single page to canvas
  function renderPage(pageNum, canvas) {
    if (!pdfDoc || !canvas) return;
    
    pdfDoc.getPage(pageNum).then(function(page) {
      const viewport = page.getViewport({ scale: zoomLevel });
      const ctx = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      page.render(renderContext).promise.then(function() {
        console.log('Page', pageNum, 'rendered at zoom', zoomLevel);
      }).catch(function(error) {
        console.error('Error rendering page', pageNum, ':', error);
      });
    }).catch(function(error) {
      console.error('Error getting page', pageNum, ':', error);
    });
  }

  // Re-render all pages when zoom changes
  function rerenderAllPages() {
    pageCanvases.forEach((canvas, index) => {
      renderPage(index + 1, canvas);
    });
  }

  // Update current page based on scroll position
  function updateCurrentPage() {
    const container = document.getElementById('pdf-container');
    const pageElements = document.querySelectorAll('.pdf-page');
    
    let topMostPage = 1;
    let smallestDistance = Infinity;
    
    pageElements.forEach((pageEl) => {
      const rect = pageEl.getBoundingClientRect();
      const distance = Math.abs(rect.top - container.getBoundingClientRect().top);
      
      if (distance < smallestDistance) {
        smallestDistance = distance;
        topMostPage = parseInt(pageEl.dataset.pageNum);
      }
    });
    
    currentPageInView = topMostPage;
    document.getElementById('current-page').textContent = currentPageInView;
  }

  // Event listeners
  const container = document.getElementById('pdf-container');
  container.addEventListener('scroll', updateCurrentPage);

  document.getElementById('page-goto').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const pageNum = parseInt(this.value);
      if (pageNum > 0 && pageNum <= pdfDoc.numPages) {
        const pageEl = document.querySelector(`.pdf-page[data-page-num="${pageNum}"]`);
        if (pageEl) {
          pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.value = '';
        }
      }
    }
  });

  document.getElementById('zoom-in').addEventListener('click', function() {
    if (!pdfDoc) {
      console.warn('PDF not loaded yet');
      return;
    }
    zoomLevel += 0.4;
    console.log('Zoom in to:', zoomLevel);
    updateZoomDisplay();
    rerenderAllPages();
  });

  document.getElementById('zoom-out').addEventListener('click', function() {
    if (!pdfDoc) {
      console.warn('PDF not loaded yet');
      return;
    }
    if (zoomLevel > 0.2) {
      zoomLevel -= 0.4;
      console.log('Zoom out to:', zoomLevel);
      updateZoomDisplay();
      rerenderAllPages();
    }
  });

  document.getElementById('reset-zoom').addEventListener('click', function() {
    if (!pdfDoc) {
      console.warn('PDF not loaded yet');
      return;
    }
    zoomLevel = BASE_ZOOM;
    console.log('Reset zoom to:', zoomLevel);
    updateZoomDisplay();
    rerenderAllPages();
  });

  // Load PDF on page load
  document.addEventListener('DOMContentLoaded', loadPdf);
</script>

---

