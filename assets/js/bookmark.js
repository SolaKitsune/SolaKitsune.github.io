// ========================================
// 書籤功能 - 混合版 (支援繁簡雙版本文字)
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
    
    // 取得完整的文章文字
    const fullText = article.textContent || article.innerText;
    const textIndex = fullText.indexOf(text);
    
    if (textIndex === -1) {
      console.error('無法在文章中定位文字');
      return;
    }
    
    // 計算前後文（各取50個字）
    const start = Math.max(0, textIndex - 50);
    const end = Math.min(fullText.length, textIndex + text.length + 50);
    const context = fullText.substring(start, end);
    
    // 判斷當前是什麼版本
    const isChineseSimple = document.querySelector('[data-lang="zh-cn"]').classList.contains('active');
    
    // 準備繁簡版本的文字
    let textTW = text;
    let textCN = text;
    
    if (window.chineseSwitcher) {
      if (isChineseSimple) {
        // 當前是簡體版，轉換成繁體保存
        textCN = text;
        if (window.chineseSwitcher.converterBack) {
          textTW = window.chineseSwitcher.converterBack(text);
        }
      } else {
        // 當前是繁體版，轉換成簡體保存
        textTW = text;
        if (window.chineseSwitcher.converter) {
          textCN = window.chineseSwitcher.converter(text);
        }
      }
    }
    
    // 生成顯示名稱，確保不會undefined
    const displayName = text.length > 20 ? text.substring(0, 20) + '...' : text;
    
    const bookmark = {
      id: span.dataset.bookmarkId,
      type: 'highlight',
      text: text,                    // 當前版本的文字
      textTW: textTW,                 // 繁體版本
      textCN: textCN,                 // 簡體版本
      textIndex: textIndex,           // 在全文中的起始位置
      context: context,               // 前後文作為備用定位
      url: window.location.pathname,
      articleTitle: articleTitle,
      date: new Date().toLocaleString(),
      savedInLang: isChineseSimple ? 'cn' : 'tw',  // 標記是在哪個版本保存的
      name: `「${displayName}」`       // 確保name欄位存在
    };
    
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    console.log('書籤已儲存', bookmark);
    
    // 通知繁簡切換：內容更新了
    if (window.chineseSwitcher) {
      window.chineseSwitcher.updateContent();
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
      const article = document.querySelector('article');
      const fullText = article.textContent || article.innerText;
      
      // 判斷當前是什麼版本
      const isChineseSimple = document.querySelector('[data-lang="zh-cn"]').classList.contains('active');
      
      // 根據當前版本決定要嘗試的文字順序
      let textsToTry = [bookmark.text];
      
      if (isChineseSimple) {
        // 當前是簡體版，先嘗試簡體，再嘗試繁體
        if (bookmark.textCN && bookmark.textCN !== bookmark.text) {
          textsToTry.push(bookmark.textCN);
        }
        if (bookmark.textTW && bookmark.textTW !== bookmark.text && bookmark.textTW !== bookmark.textCN) {
          textsToTry.push(bookmark.textTW);
        }
      } else {
        // 當前是繁體版，先嘗試繁體，再嘗試簡體
        if (bookmark.textTW && bookmark.textTW !== bookmark.text) {
          textsToTry.push(bookmark.textTW);
        }
        if (bookmark.textCN && bookmark.textCN !== bookmark.text && bookmark.textCN !== bookmark.textTW) {
          textsToTry.push(bookmark.textCN);
        }
      }
      
      // 去重
      textsToTry = [...new Set(textsToTry)];
      
      let textIndex = -1;
      let matchedText = '';
      
      // 嘗試每個可能的文字版本
      for (const tryText of textsToTry) {
        textIndex = fullText.indexOf(tryText);
        if (textIndex !== -1) {
          matchedText = tryText;
          console.log('找到匹配文字:', tryText);
          break;
        }
      }
      
      // 如果還是找不到，用前後文輔助定位
      if (textIndex === -1 && bookmark.context) {
        const contextIndex = fullText.indexOf(bookmark.context);
        if (contextIndex !== -1) {
          for (const tryText of textsToTry) {
            const contextStart = bookmark.context.indexOf(tryText);
            if (contextStart !== -1) {
              textIndex = contextIndex + contextStart;
              matchedText = tryText;
              console.log('通過前後文找到文字:', tryText);
              break;
            }
          }
        }
      }
      
      if (textIndex === -1) {
        console.log('找不到文字，嘗試過:', textsToTry);
        return;
      }
      
      // 找到包含這個文字位置的文字節點
      let textNode = null;
      let charCount = 0;
      
      const walker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // 跳過已經有 highlight 的節點
            if (node.parentElement && node.parentElement.classList.contains('bookmark-highlight')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const nodeText = node.textContent;
        const nodeLength = nodeText.length;
        
        if (charCount <= textIndex && textIndex < charCount + nodeLength) {
          textNode = node;
          break;
        }
        charCount += nodeLength;
      }
      
      if (!textNode) {
        console.log('找不到文字節點');
        return;
      }
      
      const localStart = textIndex - charCount;
      
      // 確保不超出節點範圍
      if (localStart + matchedText.length > textNode.textContent.length) {
        console.log('文字跨越節點邊界，無法標記');
        return;
      }
      
      const range = document.createRange();
      range.setStart(textNode, localStart);
      range.setEnd(textNode, localStart + matchedText.length);
      
      const span = document.createElement('span');
      span.className = 'bookmark-highlight';
      span.setAttribute('data-bookmark-id', bookmark.id);
      range.surroundContents(span);
      
    } catch (e) {
      console.log('無法套用書籤:', e);
    }
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
      window.chineseSwitcher.updateContent();
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
    
    // 確保名稱存在，如果不存在則從文字內容生成
    let displayName = bookmark.name;
    if (!displayName && bookmark.text) {
      const shortText = bookmark.text.length > 20 ? bookmark.text.substring(0, 20) + '...' : bookmark.text;
      displayName = `「${shortText}」`;
    } else if (!displayName) {
      displayName = '未命名書籤';
    }
    
    // 確保文章標題存在
    const articleTitle = bookmark.articleTitle || '未知章節';
    
    // 確保日期存在
    const date = bookmark.date || new Date().toLocaleString();
    
    return `
      <div class="bookmark-item">
        <div class="bookmark-info">
          <div class="bookmark-name">${typeIcon} ${this.escapeHtml(displayName)}</div>
          <div class="bookmark-meta">
            ${this.escapeHtml(articleTitle)} | ${typeText} | ${this.escapeHtml(date)}
          </div>
        </div>
        <div class="bookmark-actions">
          <button class="goto-bookmark" data-id="${bookmark.id}" title="跳轉">🔍</button>
          <button class="delete-bookmark" data-id="${bookmark.id}" title="刪除">🗑️</button>
        </div>
      </div>
    `;
  },

  // 簡單的 HTML 轉義函數，防止 XSS
  escapeHtml: function(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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