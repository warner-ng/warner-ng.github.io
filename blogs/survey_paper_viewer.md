---
layout: default
title: Survey Paper Viewer
description: View my survey paper on robot skills and future directions
---

# Survey Paper: Robot Skills & Future Directions

View the PDF below without needing to download it:

<style>
  #pdf-container {
    width: 100%;
    height: 800px;
    border: 1px solid #ccc;
    margin: 20px 0;
    background: #f5f5f5;
  }
  
  #pdf-controls {
    margin: 20px 0;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
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
</style>

<div id="pdf-controls">
  <button id="prev-page">← Previous</button>
  <span id="page-info">Page <span id="current-page">1</span> of <span id="total-pages">0</span></span>
  <button id="next-page">Next →</button>
  <input type="number" id="page-number" min="1" style="width: 60px; padding: 6px;" placeholder="Go to page">
  <button id="zoom-in">Zoom In</button>
  <button id="zoom-out">Zoom Out</button>
  <a id="download-link" href="./robot_skill_future.pdf" download style="margin-left: auto;">
    <button>Download PDF</button>
  </a>
</div>

<canvas id="pdf-canvas"></canvas>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

<script>
  let pdfDoc = null;
  let currentPage = 1;
  let zoomLevel = 1.5;

  // Set up PDF.js worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Load the PDF
  function loadPdf() {
    const pdfUrl = './robot_skill_future.pdf';
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
      pdfDoc = pdf;
      document.getElementById('total-pages').textContent = pdf.numPages;
      renderPage(currentPage);
    }).catch(function(error) {
      document.getElementById('pdf-container').innerHTML = '<p style="padding: 20px; color: red;">Error loading PDF. Please try downloading it directly.</p>';
      console.error('Error loading PDF:', error);
    });
  }

  // Render a page
  function renderPage(pageNum) {
    if (!pdfDoc) return;
    
    if (pageNum > pdfDoc.numPages) pageNum = pdfDoc.numPages;
    if (pageNum < 1) pageNum = 1;
    currentPage = pageNum;

    pdfDoc.getPage(pageNum).then(function(page) {
      const viewport = page.getViewport({ scale: zoomLevel });
      const canvas = document.getElementById('pdf-canvas');
      const ctx = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      page.render(renderContext).promise.then(function() {
        document.getElementById('current-page').textContent = currentPage;
        document.getElementById('prev-page').disabled = currentPage <= 1;
        document.getElementById('next-page').disabled = currentPage >= pdfDoc.numPages;
      });
    });
  }

  // Event listeners
  document.getElementById('prev-page').addEventListener('click', function() {
    renderPage(--currentPage);
  });

  document.getElementById('next-page').addEventListener('click', function() {
    renderPage(++currentPage);
  });

  document.getElementById('page-number').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const pageNum = parseInt(this.value);
      if (pageNum > 0) {
        renderPage(pageNum);
        this.value = '';
      }
    }
  });

  document.getElementById('zoom-in').addEventListener('click', function() {
    zoomLevel += 0.2;
    renderPage(currentPage);
  });

  document.getElementById('zoom-out').addEventListener('click', function() {
    if (zoomLevel > 0.4) {
      zoomLevel -= 0.2;
      renderPage(currentPage);
    }
  });

  // Load PDF on page load
  document.addEventListener('DOMContentLoaded', loadPdf);
</script>

---

## About This Survey

This survey paper explores the landscape of robot skills, learning approaches, and future directions in robotics. Use the viewer above to navigate through the document with intuitive controls including page navigation, zoom functionality, and the ability to download the full PDF if needed.

**Features:**
- Page navigation (previous/next)
- Jump to specific page
- Zoom in/out for better readability
- Download option for offline viewing
