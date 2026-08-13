// assets/js/gallery.js
window.gallery = {
  init: function() {
    this.initPhotoSwipe();
  },

  initPhotoSwipe: function() {
    // 檢查 PhotoSwipe 是否載入
    if (typeof PhotoSwipe === 'undefined') {
      console.warn('PhotoSwipe 未載入');
      return;
    }
    
    const links = document.querySelectorAll('a.gallery-link');
    if (!links.length) return;
    
    // 使用箭頭函數保留 this 上下文
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.openGallery(links, index);
      });
    });
  },

  openGallery: function(links, startIndex) {
    // 建立圖片陣列
    const items = Array.from(links).map((l, i) => {
      const img = l.querySelector('img');
      
      // 取得圖片尺寸
      let width = l.dataset.pswpWidth ? parseInt(l.dataset.pswpWidth) : 1200;
      let height = l.dataset.pswpHeight ? parseInt(l.dataset.pswpHeight) : 800;
      
      // 如果圖片已載入，使用實際尺寸
      if (img && img.complete && img.naturalWidth) {
        width = img.naturalWidth;
        height = img.naturalHeight;
      }
      
      return {
        src: l.href,
        width: width,
        height: height,
        alt: img?.alt || `圖片 ${i + 1}`,
        thumbSrc: img?.src || ''
      };
    });
    
    // 初始化 PhotoSwipe
    const pswp = new PhotoSwipe({
      dataSource: items,
      index: startIndex,
      bgOpacity: 0.9,
      closeOnVerticalDrag: true,
      closeOnBackgroundClick: true,
      arrowKeys: true,
      wheelToZoom: true,
      loop: true,
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
    });
    
    pswp.init();
  }
};