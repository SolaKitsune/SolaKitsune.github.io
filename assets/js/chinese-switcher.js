// ========================================
// 繁簡切換功能
// 功能：儲存原始繁體，切換時恢復
// ========================================

window.chineseSwitcher = {
  // 原始內容儲存
  originalContent: null,
  converter: null,
  
  init: function() {
    // 直接使用已載入的 OpenCC（因為已經在 body.html 預先載入）
    if (window.OpenCC) {
      this.converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
      this.initSwitcher();
    } else {
      // 如果還沒載入好，等待一下
      console.log('等待 OpenCC 載入...');
      setTimeout(() => this.init(), 100);
    }
  },
  
  initSwitcher: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    // 儲存原始繁體內容
    this.originalContent = article.innerHTML;
    
    const twBtn = document.querySelector('[data-lang="zh-tw"]');
    const cnBtn = document.querySelector('[data-lang="zh-cn"]');
    
    if (!twBtn || !cnBtn) return;
    
    // 繁轉簡
    cnBtn.addEventListener('click', () => {
      if (cnBtn.classList.contains('active')) return;
      
      // 切換按鈕狀態
      cnBtn.classList.add('active');
      twBtn.classList.remove('active');
      
      // 如果還沒轉換過才轉
      if (article.innerHTML === this.originalContent) {
        article.innerHTML = this.converter(this.originalContent);
      }
      
      // 儲存偏好
      localStorage.setItem('preferredChinese', 'cn');
    });
    
    // 簡轉繁（恢復原始）
    twBtn.addEventListener('click', () => {
      if (twBtn.classList.contains('active')) return;
      
      twBtn.classList.add('active');
      cnBtn.classList.remove('active');
      
      // 恢復原始繁體
      if (this.originalContent) {
        article.innerHTML = this.originalContent;
      }
      
      localStorage.setItem('preferredChinese', 'tw');
    });
    
    // 載入偏好
    const saved = localStorage.getItem('preferredChinese');
    if (saved === 'cn') {
      cnBtn.click();
    }
    
    console.log('繁簡切換初始化完成');
  }
};