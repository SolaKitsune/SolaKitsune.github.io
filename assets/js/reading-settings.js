// ========================================
// 閱讀設定功能
// 控制：字體大小、閱讀寬度
// 儲存：localStorage
// ========================================

window.readingSettings = {
  init: function() {
    this.initModeButtons();
    this.initFontButtons();
    this.initSettingsPanel();
    this.loadSavedSettings();
    this.checkSafeArea();
  },
  
  // ===== 寬度切換 =====
  initModeButtons: function() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    modeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = btn.dataset.mode;
        this.setReadingMode(mode);
      });
    });
  },
  
  // ===== 字體大小切換 =====
  initFontButtons: function() {
    const fontBtns = document.querySelectorAll('.font-btn');
    
    fontBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const size = btn.dataset.size;
        this.setFontSize(size);
      });
    });
  },
  
  // ===== 設定面板開關 =====
  initSettingsPanel: function() {
    const trigger = document.querySelector('.settings-trigger');
    if (!trigger) return;
    
    // 點擊齒輪開關面板
    trigger.addEventListener('click', (e) => {
      // 如果點的是按鈕，不要關閉面板
      if (e.target.classList.contains('mode-btn') || 
          e.target.classList.contains('font-btn')) {
        return;
      }
      trigger.classList.toggle('active');
    });
    
    // 點擊外部關閉面板
    document.addEventListener('click', (e) => {
      if (trigger && !trigger.contains(e.target)) {
        trigger.classList.remove('active');
      }
    });
    
    // ESC 鍵關閉面板
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && trigger.classList.contains('active')) {
        trigger.classList.remove('active');
      }
    });
  },
  
  // ===== 載入儲存的設定 =====
  loadSavedSettings: function() {
    const savedMode = localStorage.getItem('preferredReadingMode') || 'medium';
    const savedFontSize = localStorage.getItem('preferredFontSize') || 'medium';
    
    this.setReadingMode(savedMode, false);  // false = 不儲存
    this.setFontSize(savedFontSize, false);
  },
  
  // ===== 設定閱讀寬度 =====
  setReadingMode: function(mode, save = true) {
    // 移除所有寬度類別
    document.body.classList.remove(
      'reading-mode-narrow', 
      'reading-mode-medium', 
      'reading-mode-wide'
    );
    
    // 加入新的寬度類別
    document.body.classList.add(`reading-mode-${mode}`);
    
    // 更新按鈕狀態
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // 儲存到 localStorage
    if (save) {
      localStorage.setItem('preferredReadingMode', mode);
    }
  },
  
  // ===== 設定字體大小 =====
  setFontSize: function(size, save = true) {
    // 移除所有字體類別
    document.body.classList.remove(
      'font-size-small', 
      'font-size-medium', 
      'font-size-large'
    );
    
    // 加入新的字體類別
    document.body.classList.add(`font-size-${size}`);
    
    // 更新按鈕狀態
    document.querySelectorAll('.font-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === size);
    });
    
    // 儲存到 localStorage
    if (save) {
      localStorage.setItem('preferredFontSize', size);
    }
  },
  
  // ===== 檢查安全區域（手機瀏覽器） =====
  checkSafeArea: function() {
    if (CSS && CSS.supports && CSS.supports('padding: env(safe-area-inset-left)')) {
      document.body.classList.add('supports-safe-area');
    }
  }
};