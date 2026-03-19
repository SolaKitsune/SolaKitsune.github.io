// ========================================
// 瀏覽器相容性檢測 - 簡化版
// ========================================

(function() {
  const ua = navigator.userAgent;
  const isBaiduBrowser = ua.indexOf('Baidu') > -1;
  const isUC = ua.indexOf('UCBrowser') > -1;
  const isQQ = ua.indexOf('QQBrowser') > -1;
  const isIE = ua.indexOf('Trident') > -1 || ua.indexOf('MSIE') > -1;
  
  // 如果是這些相容性較差的瀏覽器
  if (isBaiduBrowser || isUC || isQQ || isIE) {
    // 顯示提示（但不要阻擋功能）
    console.warn('檢測到相容性較差的瀏覽器，部分功能可能受限');
    
    // 建立提示（可選）
    const notice = document.createElement('div');
    notice.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    notice.innerHTML = '您使用的瀏覽器可能無法完整支援書籤功能，建議使用 Chrome 以獲得最佳體驗';
    
    // 5秒後自動消失
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 5000);
  }
})();