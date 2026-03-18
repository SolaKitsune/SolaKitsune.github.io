// ========================================
// 繁簡切換功能 - 修正版（考慮閱讀進度功能）
// ========================================

window.chineseSwitcher = {
  twContent: null,
  cnContent: null,
  converter: null,
  
init: function() {
  if (window.OpenCC) {
    this.converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
    this.converterBack = OpenCC.Converter({ from: 'cn', to: 'tw' }); // 添加反向轉換
    this.initSwitcher();
  } else {
    console.log('等待 OpenCC 載入...');
    setTimeout(() => this.init(), 100);
  }
},
  
  initSwitcher: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    // 保存純文字版本的內容（不包含任何額外標記）
    this.saveCleanContent();
    
    const twBtn = document.querySelector('[data-lang="zh-tw"]');
    const cnBtn = document.querySelector('[data-lang="zh-cn"]');
    
    if (!twBtn || !cnBtn) return;
    
    // 繁轉簡
    cnBtn.addEventListener('click', () => {
      if (cnBtn.classList.contains('active')) return;
      
      // 切換前保存當前閱讀位置
      const currentScroll = window.scrollY;
      
      // 移除所有 highlight 和閱讀進度相關的標記
      this.removeAllMarkers();
      
      // 保存當前版本的純文字內容
      this.saveCleanContent();
      
      // 如果還沒有簡體版本，就建立
      if (!this.cnContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.twContent;
        this.cnContent = this.converter(tempDiv.innerHTML);
      }
      
      // 顯示簡體版本
      article.innerHTML = this.cnContent;
      
      // 重新初始化閱讀進度功能（會重新計算字數等）
      if (window.readingProgress) {
        window.readingProgress.calculateReadingTime();
        window.readingProgress.initWordCount();
      }
      
      // 重新載入書籤
      if (window.bookmark) {
        window.bookmark.loadHighlights();
      }
      
      // 恢復閱讀位置
      setTimeout(() => {
        window.scrollTo(0, currentScroll);
      }, 50);
      
      cnBtn.classList.add('active');
      twBtn.classList.remove('active');
      localStorage.setItem('preferredChinese', 'cn');
    });
    
    // 簡轉繁
    twBtn.addEventListener('click', () => {
      if (twBtn.classList.contains('active')) return;
      
      // 切換前保存當前閱讀位置
      const currentScroll = window.scrollY;
      
      // 移除所有 highlight 和閱讀進度相關的標記
      this.removeAllMarkers();
      
      // 保存當前版本的純文字內容
      this.saveCleanContent();
      
      // 顯示繁體版本
      article.innerHTML = this.twContent;
      
      // 重新初始化閱讀進度功能
      if (window.readingProgress) {
        window.readingProgress.calculateReadingTime();
        window.readingProgress.initWordCount();
      }
      
      // 重新載入書籤
      if (window.bookmark) {
        window.bookmark.loadHighlights();
      }
      
      // 恢復閱讀位置
      setTimeout(() => {
        window.scrollTo(0, currentScroll);
      }, 50);
      
      twBtn.classList.add('active');
      cnBtn.classList.remove('active');
      localStorage.setItem('preferredChinese', 'tw');
    });
    
    // 載入偏好
    const saved = localStorage.getItem('preferredChinese');
    if (saved === 'cn') {
      setTimeout(() => cnBtn.click(), 100);
    }
    
    console.log('繁簡切換初始化完成');
  },
  
  // 保存不包含任何標記的純文字內容
  saveCleanContent: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const currentLang = document.querySelector('[data-lang="zh-cn"]')?.classList.contains('active') ? 'cn' : 'tw';
    
    // 複製一份 DOM
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.innerHTML;
    
    // 移除所有 highlight 標籤
    tempDiv.querySelectorAll('.bookmark-highlight').forEach(span => {
      const text = span.textContent;
      span.parentNode.replaceChild(document.createTextNode(text), span);
    });
    
    // 合併相鄰的文字節點
    this.normalizeTextNodes(tempDiv);
    
    // 保存純文字版本
    if (currentLang === 'tw') {
      this.twContent = tempDiv.innerHTML;
    } else {
      this.cnContent = tempDiv.innerHTML;
    }
  },
  
  // 移除頁面上的所有標記
  removeAllMarkers: function() {
    const article = document.querySelector('article');
    
    // 移除 highlight
    article.querySelectorAll('.bookmark-highlight').forEach(span => {
      const text = span.textContent;
      span.parentNode.replaceChild(document.createTextNode(text), span);
    });
    
    // 合併文字節點
    this.normalizeTextNodes(article);
  },
  
  // 合併相鄰的文字節點
  normalizeTextNodes: function(element) {
    element.normalize();
  },
  
  // 讓 bookmark.js 通知我們內容更新
  updateContent: function() {
    // 重新保存純文字內容
    this.saveCleanContent();
  }
};