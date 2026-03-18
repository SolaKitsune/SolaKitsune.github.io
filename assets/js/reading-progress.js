// ========================================
// 閱讀進度功能整合（修改版）
// 包含：進度條、閱讀位置記憶、閱讀時間計算、字數統計
// ========================================

window.readingProgress = {
  // ===== 初始化所有功能 =====
  init: function() {
    this.initProgressBar();
    this.initReadingPosition();
    this.calculateReadingTime();
    this.initWordCount();
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
    updateProgress();
  },

  // ===== 2. 閱讀位置記憶 =====
  initReadingPosition: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const articleId = article.id || window.location.pathname;
    const savedPosition = localStorage.getItem(`reading-position-${articleId}`);
    
    if (savedPosition && parseInt(savedPosition) > 100) {
      this.showPositionButton(savedPosition);
    }
    
    let saveTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        localStorage.setItem(`reading-position-${articleId}`, scrollTop);
      }, 2000);
    });
  },

  showPositionButton: function(position) {
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
    
    window.addEventListener('scroll', () => {
      if (btn.parentNode) {
        setTimeout(() => {
          if (btn.parentNode) btn.remove();
        }, 3000);
      }
    }, { once: true });
    
    setTimeout(() => {
      if (btn.parentNode) btn.remove();
    }, 8000);
  },

  // ===== 3. 閱讀時間計算 =====
  calculateReadingTime: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    // 先移除可能存在的 highlight 標籤再計算
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.innerHTML;
    tempDiv.querySelectorAll('.bookmark-highlight').forEach(span => {
      const text = span.textContent;
      span.parentNode.replaceChild(document.createTextNode(text), span);
    });
    
    const text = tempDiv.textContent || tempDiv.innerText;
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const totalWords = chineseChars + englishWords;
    
    const wordsPerMinute = 300;
    const minutes = Math.ceil(totalWords / wordsPerMinute);
    
    this.updateReadingTimeDisplay(minutes);
    this.updateReadingTimeTitle(minutes);
    
    // 保存總字數用於剩餘字數計算
    this.totalWords = totalWords;
  },

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
  },

  // ===== 4. 字數統計 =====
  initWordCount: function() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const wordCountEl = document.getElementById('chapter-word-count');
    if (wordCountEl && this.totalWords) {
      wordCountEl.textContent = this.formatNumber(this.totalWords);
    }
    
    // 重新綁定滾動事件更新剩餘字數
    window.removeEventListener('scroll', this.boundUpdateRemaining);
    this.boundUpdateRemaining = () => this.updateRemainingWords();
    window.addEventListener('scroll', this.boundUpdateRemaining);
    this.updateRemainingWords();
  },

  updateRemainingWords: function() {
    if (!this.totalWords) return;
    
    const article = document.querySelector('article');
    if (!article) return;
    
    const scrollTop = window.scrollY;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableHeight = articleHeight - windowHeight;
    
    const progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
    const remainingWords = Math.round(this.totalWords * (1 - progress / 100));
    
    const remainingEl = document.getElementById('remaining-words');
    if (remainingEl) {
      remainingEl.textContent = this.formatNumber(remainingWords);
    }
    
    const percentEl = document.getElementById('reading-progress-percent');
    if (percentEl) {
      percentEl.textContent = Math.round(progress) + '%';
    }
  },

  formatNumber: function(num) {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '萬';
    }
    return num.toString();
  }
};