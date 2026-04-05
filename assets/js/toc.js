/**
 * Table of Contents Generator and Scroll Tracking
 * Dynamically generates a table of contents from page headings
 * and highlights the active section as the user scrolls
 */

document.addEventListener('DOMContentLoaded', function() {
   const section = document.querySelector('section');
   
   if (!section) return;

   // Extract all headings from the main content
   const headings = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6'));
   
   // Filter out headings that don't have meaningful content
   const meaningfulHeadings = headings.filter(h => {
      const text = h.textContent.trim();
      return text.length > 0 && text !== 'Hi there!' && h.id !== 'warnerWu吴秉寰';
   });

   if (meaningfulHeadings.length < 2) return; // Only show ToC if there are meaningful headings

   // Add IDs to headings that don't have them
   meaningfulHeadings.forEach((heading, index) => {
      if (!heading.id) {
         heading.id = `heading-${index}`;
      }
   });

   // Build nested structure
   const toc = buildTocStructure(meaningfulHeadings);
   
   // Create the ToC container
   const tocContainer = createTocContainer(toc);
   
   // Insert the ToC after the section
   const wrapper = document.querySelector('.wrapper');
   if (wrapper) {
      section.parentNode.insertBefore(tocContainer, section.nextSibling);
      
      // Update wrapper classes
      wrapper.classList.add('wrapper-with-toc');
   }

   // Setup scroll tracking
   setupScrollTracking(meaningfulHeadings);
});

/**
 * Build nested structure based on heading levels
 */
function buildTocStructure(headings) {
   const items = [];
   const stack = [];

   headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      const item = {
         level,
         text: heading.textContent.trim(),
         id: heading.id,
         children: []
      };

      // Remove items from stack that are deeper than current level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
         stack.pop();
      }

      // Add to parent or root
      if (stack.length === 0) {
         items.push(item);
      } else {
         stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
   });

   return items;
}

/**
 * Create the ToC HTML structure
 */
function createTocContainer(items) {
   const container = document.createElement('aside');
   container.className = 'toc-container';

   const title = document.createElement('div');
   title.className = 'toc-title';
   title.textContent = 'Contents';
   container.appendChild(title);

   const list = createTocList(items);
   container.appendChild(list);

   return container;
}

/**
 * Create nested list elements
 */
function createTocList(items) {
   const ul = document.createElement('ul');
   ul.className = 'toc-list';

   items.forEach(item => {
      const li = document.createElement('li');
      
      const link = document.createElement('a');
      link.href = `#${item.id}`;
      link.textContent = item.text;
      li.appendChild(link);

      if (item.children.length > 0) {
         li.appendChild(createTocList(item.children));
      }

      ul.appendChild(li);
   });

   return ul;
}

/**
 * Setup scroll tracking to highlight active section
 */
function setupScrollTracking(headings) {
   const links = document.querySelectorAll('.toc-container a');

   function updateActiveLink() {
      let currentId = '';

      // Find the heading closest to the top of the viewport
      for (const heading of headings) {
         const rect = heading.getBoundingClientRect();
         if (rect.top <= 120) { // Account for nav bar
            currentId = heading.id;
         } else {
            break;
         }
      }

      // Update active links
      links.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
            
            // Scroll the ToC container to keep active link visible
            const tocContainer = document.querySelector('.toc-container');
            if (tocContainer) {
               const linkPosition = link.offsetTop;
               const containerHeight = tocContainer.clientHeight;
               const scrollPosition = tocContainer.scrollTop;

               if (linkPosition < scrollPosition) {
                  tocContainer.scrollTop = linkPosition - 50;
               } else if (linkPosition > scrollPosition + containerHeight - 100) {
                  tocContainer.scrollTop = linkPosition - containerHeight + 100;
               }
            }
         }
      });
   }

   // Update on scroll with throttling
   let ticking = false;
   window.addEventListener('scroll', () => {
      if (!ticking) {
         window.requestAnimationFrame(() => {
            updateActiveLink();
            ticking = false;
         });
         ticking = true;
      }
   });

   // Initial call
   updateActiveLink();
}
