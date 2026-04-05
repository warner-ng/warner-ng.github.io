// Table of Contents Generator
console.log('toc.js loaded');

document.addEventListener('DOMContentLoaded', function() {
   var section = document.querySelector('section');
   if (!section) return;

   var headings = Array.from(section.querySelectorAll('h2, h3, h4, h5, h6'));
   if (headings.length < 1) return;

   headings.forEach(function(heading, index) {
      if (!heading.id) heading.id = 'heading-' + index;
   });

   var toc = buildTocStructure(headings);
   var tocContainer = createTocContainer(toc);
   
   var wrapper = document.querySelector('.wrapper');
   if (wrapper) {
      section.parentNode.insertBefore(tocContainer, section.nextSibling);
   }

   setupScrollTracking(headings);
});

function buildTocStructure(headings) {
   var items = [];
   var stack = [];

   headings.forEach(function(heading) {
      var level = parseInt(heading.tagName.charAt(1));
      var item = { level: level, text: heading.textContent.trim(), id: heading.id, children: [] };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
         stack.pop();
      }

      if (stack.length === 0) {
         items.push(item);
      } else {
         stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
   });

   return items;
}

function createTocContainer(items) {
   var container = document.createElement('aside');
   container.className = 'toc-container';
   var title = document.createElement('div');
   title.className = 'toc-title';
   title.textContent = 'Contents';
   container.appendChild(title);
   container.appendChild(createTocList(items));
   return container;
}

function createTocList(items) {
   var ul = document.createElement('ul');
   ul.className = 'toc-list';

   items.forEach(function(item) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + item.id;
      link.textContent = item.text;
      li.appendChild(link);
      if (item.children.length > 0) {
         li.appendChild(createTocList(item.children));
      }
      ul.appendChild(li);
   });

   return ul;
}

function setupScrollTracking(headings) {
   var links = document.querySelectorAll('.toc-container a');

   function updateActiveLink() {
      var currentId = '';
      for (var i = 0; i < headings.length; i++) {
         var rect = headings[i].getBoundingClientRect();
         if (rect.top <= 120) currentId = headings[i].id;
         else break;
      }

      links.forEach(function(link) {
         link.classList.remove('active');
         if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
            var tocContainer = document.querySelector('.toc-container');
            if (tocContainer) {
               var linkPos = link.offsetTop;
               var contHeight = tocContainer.clientHeight;
               var scrollPos = tocContainer.scrollTop;
               if (linkPos < scrollPos) tocContainer.scrollTop = linkPos - 50;
               else if (linkPos > scrollPos + contHeight - 100) tocContainer.scrollTop = linkPos - contHeight + 100;
            }
         }
      });
   }

   var ticking = false;
   window.addEventListener('scroll', function() {
      if (!ticking) {
         window.requestAnimationFrame(function() {
            updateActiveLink();
            ticking = false;
         });
         ticking = true;
      }
   });

   updateActiveLink();
}
