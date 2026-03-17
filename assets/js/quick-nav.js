// ========================================
// 快速導航功能 - 回到頂部/底部按鈕
// ========================================

window.quickNav = {
  init: function() {
    this.initQuickNav();
  },
  
  initQuickNav: function() {
    // 建立按鈕（如果 HTML 中還沒有的話）
    this.createNavButtons();
    
    const topBtn = document.getElementById('goToTop');
    const bottomBtn = document.getElementById('goToBottom');
    
    if (!topBtn || !bottomBtn) {
      console.log('快速導航按鈕不存在');
      return;
    }
    
    // 回到頂部
    topBtn.addEventListener('click', () => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    });
    
    // 跳到底部
    bottomBtn.addEventListener('click', () => {
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
      });
    });
    
    // 滾動時顯示/隱藏按鈕
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        topBtn.classList.remove('hidden');
      } else {
        topBtn.classList.add('hidden');
      }
    });
    
    // 初始隱藏
    topBtn.classList.add('hidden');
  },
  
  createNavButtons: function() {
    // 如果已經有按鈕就不要重複建立
    if (document.querySelector('.quick-nav')) return;
    
    const nav = document.createElement('div');
    nav.className = 'quick-nav';
    nav.innerHTML = `
      <button class="nav-btn" id="goToTop" title="回到頂部">⬆️</button>
      <button class="nav-btn" id="goToBottom" title="跳到底部">⬇️</button>
    `;
    document.body.appendChild(nav);
  }
};