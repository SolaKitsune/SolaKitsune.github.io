// ========================================
// 閱讀進度功能整合
// 包含：進度條、閱讀位置記憶、閱讀時間計算
// ========================================

window.readingProgress = {
  // ===== 初始化所有功能 =====
  init: function() {
    this.initProgressBar();
    this.initReadingPosition();
    this.calculateReadingTime();
  },

  // ===== 1. 閱讀進度條 =====
  initProgressBar: function() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;
    
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      progressBar.style.width = progress + '%';
    };
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress(); // 初始更新
  },

  // ===== 2. 閱讀位置記憶 =====
  initReadingPosition: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const articleId = article.id || window.location.pathname;
    const savedPosition = localStorage.getItem(`reading-position-${articleId}`);
    
    // 如果有上次位置，顯示小按鈕
    if (savedPosition && parseInt(savedPosition) > 100) {
      this.showPositionButton(savedPosition);
    }
    
    // 儲存閱讀位置
    let saveTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        localStorage.setItem(`reading-position-${articleId}`, scrollTop);
      }, 2000);
    });
  },

  // 顯示側邊小按鈕
  showPositionButton: function(position) {
    // 避免重複建立
    if (document.querySelector('.position-return-btn')) return;
    
    const btn = document.createElement('div');
    btn.className = 'position-return-btn';
    btn.innerHTML = '⏎ 上次進度';
    btn.title = '點擊回到上次閱讀位置';
    
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: parseInt(position),
        behavior: 'smooth'
      });
      btn.remove();
    });
    
    // 滾動後自動消失
    window.addEventListener('scroll', () => {
      if (btn.parentNode) {
        setTimeout(() => {
          if (btn.parentNode) btn.remove();
        }, 3000);
      }
    }, { once: true });
    
    // 5秒後自動消失
    setTimeout(() => {
      if (btn.parentNode) btn.remove();
    }, 8000);
  },  // ← 這裡加上逗號！

  // ===== 3. 閱讀時間計算 =====
  calculateReadingTime: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    // 計算字數
    const text = article.textContent || article.innerText;
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const totalWords = chineseChars + englishWords;
    
    // 閱讀速度：每分鐘 300 字
    const wordsPerMinute = 300;
    const minutes = Math.ceil(totalWords / wordsPerMinute);
    
    // 更新顯示
    this.updateReadingTimeDisplay(minutes);
    this.updateReadingTimeTitle(minutes);
  },

  // 更新閱讀時間文字
  updateReadingTimeDisplay: function(minutes) {
    const estimateElement = document.querySelector('.estimate-text');
    if (!estimateElement) return;
    
    if (minutes < 1) {
      estimateElement.textContent = '<1m';
    } else if (minutes < 60) {
      estimateElement.textContent = `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        estimateElement.textContent = `${hours}h`;
      } else {
        estimateElement.textContent = `${hours}h${remainingMinutes}m`;
      }
    }
  },

  // 更新閱讀時間提示
  updateReadingTimeTitle: function(minutes) {
    const timeContainer = document.querySelector('.reading-time-on-progress');
    if (!timeContainer) return;
    
    if (minutes < 1) {
      timeContainer.title = '閱讀時間：少於 1 分鐘';
    } else if (minutes < 60) {
      timeContainer.title = `閱讀時間：約 ${minutes} 分鐘`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      timeContainer.title = `閱讀時間：約 ${hours} 小時 ${remainingMinutes} 分鐘`;
    }
  }
};