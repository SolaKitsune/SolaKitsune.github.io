// ========================================
// 書籤功能 - 混合版
// 有選取文字：存書籤 + highlight
// 沒選取文字：存閱讀位置
// ========================================

window.bookmark = {
  init: function() {
    this.bindBookmarkButton();
    this.initBookmarkList();
    this.loadHighlights();
    console.log('書籤功能初始化完成');
  },

  // 綁定書籤按鈕
  bindBookmarkButton: function() {
    const btn = document.querySelector('.bookmark-button');
    if (btn) {
      btn.removeAttribute('onclick');
      
      btn.addEventListener('mousedown', (e) => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        if (selectedText) {
          try {
            const range = selection.getRangeAt(0);
            this.tempRange = range.cloneRange();
            this.tempText = selectedText;
          } catch (e) {
            console.log('無法取得選取範圍');
          }
        }
      });
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (this.tempText && this.tempRange) {
          this.addBookmarkWithRange(this.tempText, this.tempRange);
          this.tempText = null;
          this.tempRange = null;
        } else {
          this.saveReadingPosition();
        }
      });
    }
  },

  addBookmarkWithRange: function(text, range) {
    try {
      const span = this.highlightRange(range);
      this.saveBookmark(text, range, span);
      this.showNotification('📌 書籤已添加');
    } catch (e) {
      console.log('書籤添加失敗:', e);
      this.showNotification('❌ 書籤添加失敗');
    }
  },

  saveReadingPosition: function() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const article = document.querySelector('article');
    const articleTitle = document.querySelector('h1')?.textContent || '未命名文章';
    
    const position = {
      id: Date.now(),
      type: 'position',
      name: `位置 ${Math.round(window.scrollY / 100)}`,
      position: window.scrollY,
      url: window.location.pathname,
      articleTitle: articleTitle,
      date: new Date().toLocaleString()
    };
    
    bookmarks.push(position);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    this.showNotification('🔖 閱讀位置已保存');
    console.log('閱讀位置已儲存', position);
  },

  highlightRange: function(range) {
    const span = document.createElement('span');
    span.className = 'bookmark-highlight';
    span.setAttribute('data-bookmark-id', Date.now());
    range.surroundContents(span);
    return span;
  },

  saveBookmark: function(text, range, span) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const article = document.querySelector('article');
    const articleTitle = document.querySelector('h1')?.textContent || '未命名文章';
    
    // 取得共同的祖先元素，確保是元素節點
    let container = range.commonAncestorContainer;
    while (container.nodeType !== 1) { // 1 是元素節點
      container = container.parentNode;
    }
    
    const parentXPath = this.getXPath(container);
    
    const bookmark = {
      id: span.dataset.bookmarkId,
      type: 'highlight',
      text: text,
      name: `「${text.substring(0, 20)}..."」`,
      xpath: parentXPath,
      url: window.location.pathname,
      articleTitle: articleTitle,
      date: new Date().toLocaleString()
    };
    
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    console.log('書籤已儲存', bookmark);
    
    // 通知繁簡切換：內容更新了
    if (window.chineseSwitcher) {
      const currentLang = document.querySelector('[data-lang="zh-cn"]').classList.contains('active') ? 'cn' : 'tw';
      window.chineseSwitcher.updateContent(currentLang, document.querySelector('article').innerHTML);
    }
  },

  getXPath: function(element) {
    if (element.id) return '//*[@id="' + element.id + '"]';
    if (element === document.body) return '/html/body';
    
    let ix = 0;
    const siblings = element.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element) {
        return this.getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
  },

  loadHighlights: function() {
    const bookmarks = this.getBookmarksForCurrentPage();
    bookmarks.forEach(bookmark => {
      if (bookmark.type === 'highlight') {
        this.applyHighlight(bookmark);
      }
    });
  },

  applyHighlight: function(bookmark) {
    try {
      const element = this.getElementByXPath(bookmark.xpath);
      if (!element) return;
      
      const fullText = element.textContent || element.innerText;
      const highlightText = bookmark.text;
      
      const textIndex = fullText.indexOf(highlightText);
      if (textIndex === -1) {
        console.log('找不到文字:', highlightText);
        return;
      }
      
      // 找到真正的文字節點
      const textNode = Array.from(element.childNodes).find(
        node => node.nodeType === 3 && node.textContent.includes(highlightText)
      );
      
      if (!textNode) {
        console.log('找不到文字節點');
        return;
      }
      
      const range = document.createRange();
      range.setStart(textNode, textIndex);
      range.setEnd(textNode, textIndex + highlightText.length);
      
      const span = document.createElement('span');
      span.className = 'bookmark-highlight';
      span.setAttribute('data-bookmark-id', bookmark.id);
      range.surroundContents(span);
      
    } catch (e) {
      console.log('無法套用書籤:', e);
    }
  },

  getElementByXPath: function(xpath) {
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  },

  getBookmarksForCurrentPage: function() {
    const all = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    return all.filter(b => b.url === window.location.pathname);
  },

  showNotification: function(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'bookmark-notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  },

  getAllBookmarks: function() {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
  },

  deleteBookmark: function(id) {
    let bookmarks = this.getAllBookmarks();
    bookmarks = bookmarks.filter(b => b.id != id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    document.querySelectorAll(`[data-bookmark-id="${id}"]`).forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    
    // 通知繁簡切換：內容更新了
    if (window.chineseSwitcher) {
      const currentLang = document.querySelector('[data-lang="zh-cn"]').classList.contains('active') ? 'cn' : 'tw';
      window.chineseSwitcher.updateContent(currentLang, document.querySelector('article').innerHTML);
    }
  },

  goToBookmark: function(bookmark) {
    if (bookmark.url !== window.location.pathname) {
      window.location.href = bookmark.url;
      setTimeout(() => {
        this.scrollToBookmark(bookmark);
      }, 500);
    } else {
      this.scrollToBookmark(bookmark);
    }
  },

  scrollToBookmark: function(bookmark) {
    if (bookmark.type === 'highlight') {
      const element = document.querySelector(`[data-bookmark-id="${bookmark.id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('bookmark-flash');
        setTimeout(() => {
          element.classList.remove('bookmark-flash');
        }, 1000);
      }
    } else {
      window.scrollTo({
        top: bookmark.position,
        behavior: 'smooth'
      });
    }
  },

  // ===== 書籤列表功能 =====
  showBookmarkList: function() {
    const panel = document.querySelector('.bookmark-list-panel');
    const content = panel.querySelector('.bookmark-list-content');
    
    const bookmarks = this.getAllBookmarks();
    const currentUrl = window.location.pathname;
    
    const currentPageBookmarks = bookmarks.filter(b => b.url === currentUrl);
    const otherPageBookmarks = bookmarks.filter(b => b.url !== currentUrl);
    
    let html = '';
    
    if (currentPageBookmarks.length > 0) {
      html += '<h4>當前章節</h4>';
      currentPageBookmarks.forEach(b => html += this.renderBookmarkItem(b));
    }
    
    if (otherPageBookmarks.length > 0) {
      html += '<h4>其他章節</h4>';
      otherPageBookmarks.forEach(b => html += this.renderBookmarkItem(b));
    }
    
    if (bookmarks.length === 0) {
      html = '<div class="empty-message">暫無書籤</div>';
    }
    
    content.innerHTML = html;
    panel.classList.add('active');
    
    content.querySelectorAll('.delete-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.deleteBookmark(parseInt(id));
        this.showBookmarkList();
      });
    });
    
    content.querySelectorAll('.goto-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const bookmark = bookmarks.find(b => b.id == id);
        if (bookmark) {
          this.goToBookmark(bookmark);
          this.hideBookmarkList();
        }
      });
    });
  },

  renderBookmarkItem: function(bookmark) {
    const typeIcon = bookmark.type === 'highlight' ? '📌' : '🔖';
    const typeText = bookmark.type === 'highlight' ? '文字標記' : '閱讀位置';
    
    return `
      <div class="bookmark-item">
        <div class="bookmark-info">
          <div class="bookmark-name">${typeIcon} ${bookmark.name}</div>
          <div class="bookmark-meta">
            ${bookmark.articleTitle} | ${typeText} | ${bookmark.date}
          </div>
        </div>
        <div class="bookmark-actions">
          <button class="goto-bookmark" data-id="${bookmark.id}" title="跳轉">🔍</button>
          <button class="delete-bookmark" data-id="${bookmark.id}" title="刪除">🗑️</button>
        </div>
      </div>
    `;
  },

  hideBookmarkList: function() {
    document.querySelector('.bookmark-list-panel').classList.remove('active');
  },

  initBookmarkList: function() {
    const listBtn = document.querySelector('.bookmark-list-button');
    if (listBtn) {
      listBtn.addEventListener('click', () => this.showBookmarkList());
    }
    
    const closeBtn = document.querySelector('.close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideBookmarkList());
    }
    
    document.addEventListener('click', (e) => {
      const panel = document.querySelector('.bookmark-list-panel');
      const btn = document.querySelector('.bookmark-list-button');
      if (panel && panel.classList.contains('active') && 
          !panel.contains(e.target) && 
          !btn.contains(e.target)) {
        this.hideBookmarkList();
      }
    });
  }
};