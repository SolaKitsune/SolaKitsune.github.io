// ========================================
// 瀏覽器相容性檢測 - 極簡測試版
// ========================================

(function() {
  const ua = navigator.userAgent;
  const isBaiduBrowser = ua.indexOf('Baidu') > -1;
  
  if (isBaiduBrowser) {
    // 先用 alert 測試是否能彈出
    alert('您正在使用百度瀏覽器，部分功能可能受限。建議使用 Chrome 瀏覽器獲得最佳體驗。');
    
    // 同時也在控制台輸出
    console.log('%c⚠️ 百度瀏覽器檢測到', 'font-size: 16px; color: orange;');
    console.log('UserAgent:', ua);
  }
})();