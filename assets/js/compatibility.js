// ========================================
// 瀏覽器相容性處理（改進版）
// ========================================

(function() {
  // 檢測瀏覽器類型和功能
  const ua = navigator.userAgent;
  const browserInfo = {
    isBaidu: ua.indexOf('Baidu') > -1,
    isUC: ua.indexOf('UCBrowser') > -1 || ua.indexOf('UCWEB') > -1,
    isQQ: ua.indexOf('QQBrowser') > -1,
    is360: ua.indexOf('360') > -1,
    isFirefox: ua.indexOf('Firefox') > -1,
    isIE: ua.indexOf('Trident') > -1 || ua.indexOf('MSIE') > -1,
    isEdge: ua.indexOf('Edg') > -1,
    isSafari: ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  };
  
  // 功能檢測
  const features = {
    treeWalker: typeof document.createTreeWalker === 'function',
    promise: typeof Promise !== 'undefined',
    symbol: typeof Symbol !== 'undefined',
    intersectionObserver: 'IntersectionObserver' in window,
    localstorage: (function() {
      try { return 'localStorage' in window; } catch(e) { return false; }
    })(),
    opencc: typeof window.OpenCC !== 'undefined'
  };
  
  console.log('瀏覽器資訊:', browserInfo);
  console.log('功能支援:', features);
  
  // 根據需要添加 polyfill
  if (!features.treeWalker) {
    console.log('TreeWalker 不受支援，啟用簡化版');
    
    // 簡化的 TreeWalker 實現
    window.SimpleTreeWalker = function(root, whatToShow, filter) {
      this.root = root;
      this.currentNode = root;
      this.nodes = [];
      
      // 簡單遍歷所有文字節點
      function collectTextNodes(node, nodes) {
        if (node.nodeType === 3) { // 文字節點
          nodes.push(node);
        } else if (node.nodeType === 1) { // 元素節點
          for (let i = 0; i < node.childNodes.length; i++) {
            collectTextNodes(node.childNodes[i], nodes);
          }
        }
      }
      
      collectTextNodes(root, this.nodes);
      this.index = 0;
      
      this.nextNode = function() {
        if (this.index < this.nodes.length) {
          return this.nodes[this.index++];
        }
        return null;
      };
    };
    
    // 替換原生的 createTreeWalker
    document.createTreeWalker = function(root, whatToShow, filter) {
      return new SimpleTreeWalker(root, whatToShow, filter);
    };
  }
  
  // 如果需要顯示提示
  if ((browserInfo.isBaidu || browserInfo.isUC || browserInfo.is360 || browserInfo.isIE) && 
      browserInfo.isMobile) {
    
    // 延遲顯示，確保頁面載入完成
    setTimeout(function() {
      const notice = document.createElement('div');
      notice.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(50, 60, 70, 0.95);
        backdrop-filter: blur(4px);
        color: white;
        padding: 12px 20px;
        border-radius: 30px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.2);
        max-width: 80%;
        text-align: center;
        animation: slideUp 0.3s ease;
      `;
      
      // 根據瀏覽器顯示不同訊息
      let browserName = '當前瀏覽器';
      if (browserInfo.isBaidu) browserName = '百度瀏覽器';
      else if (browserInfo.isUC) browserName = 'UC瀏覽器';
      else if (browserInfo.isQQ) browserName = 'QQ瀏覽器';
      else if (browserInfo.is360) browserName = '360瀏覽器';
      else if (browserInfo.isIE) browserName = 'IE瀏覽器';
      
      notice.innerHTML = `${browserName} 的部分功能可能受限，<br>建議使用 Chrome 獲得最佳體驗。`;
      
      document.body.appendChild(notice);
      
      // 5秒後淡出
      setTimeout(() => {
        notice.style.transition = 'opacity 0.3s';
        notice.style.opacity = '0';
        setTimeout(() => notice.remove(), 300);
      }, 5000);
    }, 1000);
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // 特別處理 Firefox（Firefox 其實支援度很好）
  if (browserInfo.isFirefox) {
    console.log('Firefox 瀏覽器，功能正常');
  }
  
  // 特別處理 Safari（需要小心某些 WebKit 特性）
  if (browserInfo.isSafari) {
    console.log('Safari 瀏覽器，檢查相容性');
    // Safari 對某些 ES6 功能支援較晚
    if (!features.promise) {
      // 添加 Promise polyfill（如果需要）
    }
  }
})();