// ========================================
// 折疊導航功能
// ========================================

(function() {
  // 等待 DOM 載入完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFoldNav);
  } else {
    initFoldNav();
  }
  
  function initFoldNav() {
    // 找到所有有子選單的項目
    const menuItems = document.querySelectorAll('.menu-item-has-children');
    
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('active');
      });
    });
    
    // 從 localStorage 讀取上次的折疊狀態
    const savedState = localStorage.getItem('navFoldState');
    if (savedState === 'folded') {
      document.body.classList.add('nav-folded');
    }
  }
})();