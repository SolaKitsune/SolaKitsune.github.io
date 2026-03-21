---
title: "引用説明"
weight: 6
bookCollapseSection: true
---

<style>
/* 索引頁面專用樣式 - 檔案櫃風格 */
.ref-index {
  max-width: 800px;
  margin: 0 auto;
}

/* 開場描述 */
.ref-intro {
  background: #f5f7fc;
  border-left: 4px solid #7f8c8d;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0 2rem 0;
  border-radius: 12px;
  color: #4a627a;
  font-size: 0.95rem;
  line-height: 1.6;
}

.ref-intro p {
  margin: 0;
}

/* 檔案卡片網格 */
.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

/* 單個檔案卡片 */
.archive-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  transition: all 0.25s ease;
  text-decoration: none;
  display: block;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.archive-card:hover {
  transform: translateY(-3px);
  border-color: #cbd5e1;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  background: #fefefe;
}

/* 卡片圖標區 */
.card-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  display: inline-block;
}

/* 卡片標題 */
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b5c7a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.3px;
}

/* 卡片描述 */
.card-desc {
  font-size: 0.8rem;
  color: #7f8c8d;
  line-height: 1.4;
  margin-bottom: 0.8rem;
}

/* 卡片底部標籤 */
.card-tag {
  display: inline-block;
  font-size: 0.65rem;
  background: #f0f2f5;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  color: #6c8196;
  font-family: monospace;
}

/* 頁尾統計 */
.archive-stats {
  margin-top: 2.5rem;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #8ba0b0;
  border-top: 1px solid #e2e8f0;
  font-family: monospace;
}

/* 響應式調整 */
@media (max-width: 600px) {
  .archive-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .ref-intro {
    padding: 1rem;
  }
}
</style>

<div class="ref-index">

<div class="ref-intro">
  📂 本頁收錄《熱線》中引用的現實素材、虛擬作品、音樂、都市傳説及 Lost Media 原型，供讀者朋友延伸參閱！
</div>

<div class="archive-grid">

  <!-- 卡片 1：音樂素材 -->
  <a href="/docs/引用説明/音樂/" class="archive-card">
    <div class="card-icon">🎵</div>
    <div class="card-title">音樂素材</div>
    <div class="card-desc">
      哈卡斯共和國國歌<br>
      Unknown 230102（來源不明的紙卷鋼琴錄音）
    </div>
    <div class="card-tag">2 項素材</div>
  </a>

  <!-- 卡片 2：都市傳說／Lost Media 原型 -->
  <a href="/docs/引用說明/都市傳說原型/" class="archive-card">
    <div class="card-icon">📖</div>
    <div class="card-title">都市傳說 · Lost Media 原型</div>
    <div class="card-desc">
      現實都市傳説 · 網路謎團 · 遺失媒體<br>
    </div>
    <div class="card-tag">建設中</div>
  </a>

  <!-- 卡片 3：圖片素材 -->
  <a href="/docs/引用說明/圖片素材/" class="archive-card">
    <div class="card-icon">🖼️</div>
    <div class="card-title">圖片素材</div>
    <div class="card-desc">
      外部圖片來源 <br>
    </div>
    <div class="card-tag">建設中</div>
  </a>

  <!-- 卡片 4：其他引用（預留） -->
  <a href="/docs/引用説明/其他引用/" class="archive-card" style="opacity: 0.7;">
    <div class="card-icon">📌</div>
    <div class="card-title">其他引用</div>
    <div class="card-desc">
      文學 · 影視 · 遊戲彩蛋<br>
      尚未歸類的引用元素
    </div>
    <div class="card-tag">預留</div>
  </a>

</div>

<div class="archive-stats">
  📅 最後整理 · <span id="index-date"></span>
</div>

</div>

<script>
const dateSpan = document.getElementById('index-date');
if (dateSpan) {
  const d = new Date();
  dateSpan.textContent = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
</script>