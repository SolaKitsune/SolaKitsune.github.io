// ========================================
// 繁簡切換功能 - 雙版本儲存版
// 功能：同時保存繁體和簡體版本的內容（含 highlight）
// ========================================

window.chineseSwitcher = {
  twContent: null,  // 繁體版 HTML（包含 highlight）
  cnContent: null,  // 簡體版 HTML（包含 highlight）
  converter: null,
  
  init: function() {
    if (window.OpenCC) {
      this.converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
      this.initSwitcher();
    } else {
      console.log('等待 OpenCC 載入...');
      setTimeout(() => this.init(), 100);
    }
  },
  
  initSwitcher: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    // 初始化：目前是繁體，儲存為 twContent
    this.twContent = article.innerHTML;
    
    const twBtn = document.querySelector('[data-lang="zh-tw"]');
    const cnBtn = document.querySelector('[data-lang="zh-cn"]');
    
    if (!twBtn || !cnBtn) return;
    
    // 繁轉簡
    cnBtn.addEventListener('click', () => {
      if (cnBtn.classList.contains('active')) return;
      
      // 切換前，先儲存目前的繁體版本（包含可能新增的 highlight）
      if (twBtn.classList.contains('active')) {
        this.twContent = article.innerHTML;
      }
      
      // 如果還沒有簡體版本，就建立
      if (!this.cnContent) {
        // 暫時轉換並儲存
        article.innerHTML = this.converter(this.twContent);
        this.cnContent = article.innerHTML;
      } else {
        // 直接使用儲存的簡體版本
        article.innerHTML = this.cnContent;
      }
      
      cnBtn.classList.add('active');
      twBtn.classList.remove('active');
      
      localStorage.setItem('preferredChinese', 'cn');
      
      // 重新載入書籤（確保 highlight 正常）
      if (window.bookmark) {
        window.bookmark.loadHighlights();
      }
    });
    
    // 簡轉繁
    twBtn.addEventListener('click', () => {
      if (twBtn.classList.contains('active')) return;
      
      // 切換前，先儲存目前的簡體版本（包含可能新增的 highlight）
      if (cnBtn.classList.contains('active')) {
        this.cnContent = article.innerHTML;
      }
      
      // 恢復繁體版本
      article.innerHTML = this.twContent;
      
      twBtn.classList.add('active');
      cnBtn.classList.remove('active');
      
      localStorage.setItem('preferredChinese', 'tw');
      
      // 重新載入書籤
      if (window.bookmark) {
        window.bookmark.loadHighlights();
      }
    });
    
    // 載入偏好
    const saved = localStorage.getItem('preferredChinese');
    if (saved === 'cn') {
      cnBtn.click();
    }
    
    console.log('繁簡切換初始化完成');
  },
  
  // 讓 bookmark.js 可以通知我們內容更新了
  updateContent: function(type, content) {
    if (type === 'tw') {
      this.twContent = content;
    } else if (type === 'cn') {
      this.cnContent = content;
    }
  }
};