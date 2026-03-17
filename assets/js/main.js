// ========================================
// 主初始化檔案
// ========================================

(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  
  function initAll() {
    console.log('開始初始化所有功能...');
    
    if (window.readingSettings) window.readingSettings.init();  // 閱讀設定開始
    if (window.gallery) window.gallery.init();                  // 畫廊開始
    if (window.quickNav) window.quickNav.init();                // 導航開始
    if (window.readingProgress) window.readingProgress.init();  // 進度條開始
    if (window.bookmark) window.bookmark.init();                // 書籤開始
    
    console.log('所有功能初始化完成');
  }
})();