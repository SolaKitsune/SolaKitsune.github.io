---
title: '作者欄目'
weight: 1
bookCollapseSection: true
---

<style>
/* 作者欄目專用樣式 - 延續佈告版紙條風格 */
.author-section {
  max-width: 900px;
  margin: 0 auto;
}

/* 開場介紹卡片 */
.author-intro {
  background: #fffef5;
  border: 1px solid #f0e2ce;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0 2rem 0;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  clip-path: polygon(0% 8px, 8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px));
}

.author-intro::before {
  content: "👤";
  position: absolute;
  left: -8px;
  top: -12px;
  font-size: 1.2rem;
  opacity: 0.7;
  transform: rotate(-10deg);
}

.author-intro p {
  margin: 0.6rem 0;
  line-height: 1.7;
  color: #5a4a32;
}

/* 文章目錄（可選） */
.article-list {
  margin: 1.5rem 0;
  padding: 0;
  list-style: none;
}

.article-list li {
  margin: 0.8rem 0;
  padding-left: 1.2rem;
  border-left: 3px solid #e0ceb0;
}

.article-list a {
  text-decoration: none;
  color: #b8860b;
  font-size: 1rem;
  transition: all 0.2s;
}

.article-list a:hover {
  color: #9b6a2c;
  padding-left: 0.2rem;
}

.article-list .article-date {
  font-size: 0.7rem;
  color: #b0a07c;
  margin-left: 0.8rem;
}

/* 文章卡片樣式 */
.article-card {
  background: #fffef5;
  border: 1px solid #f0e2ce;
  padding: 1.5rem;
  margin: 2rem 0;
  clip-path: polygon(0% 8px, 8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px));
}

.article-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #e0ceb0;
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #b8860b;
  margin: 0;
}

.article-date {
  font-size: 0.75rem;
  color: #b0a07c;
  font-family: monospace;
}

.article-content {
  color: #5a4a32;
  line-height: 1.7;
}

.article-content h3 {
  font-size: 1.1rem;
  color: #9b6a2c;
  margin: 1rem 0 0.5rem;
}

.article-content blockquote {
  margin: 1rem 0;
  padding-left: 1rem;
  border-left: 3px solid #e0ceb0;
  color: #8b7355;
  font-style: normal;
}

.article-content hr {
  border: none;
  border-top: 1px dashed #e0ceb0;
  margin: 1.5rem 0;
}

.read-more {
  margin-top: 1rem;
  text-align: right;
}

.read-more a {
  color: #b8860b;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.read-more a:hover {
  color: #9b6a2c;
  margin-right: -0.2rem;
}
</style>

<div class="author-section">

<!-- 開場介紹 -->
<div class="author-intro">
  <p>讀者朋友們，您好！</p>
  <p>我是一名 AuDHD（Autism Spectrum Disorderp【自閉症光譜症候群】 + Attention Deficit Hyperactivity Disorder【注意力不足過動症】）創作者。這讓我在創作中融入了大量自己對語言的感知方式：在作品中，您可能會見到我用許多細節去堆疊某一個細節、意象、情緒（並且故事也因此而脫離了線性發展，令角色們所處的時間與想法都在不同時段中跳來跳去），也可能讓角色之間的對話節奏和行為略顯奇特。</p>
  <p>文字幫助我重新構造一個如同劇場般的世界，讓我可以與筆下的角色對視，也希望它們可助您在閱讀中感受到這些被構築出的節奏與溫度。願我們在這個奇妙的劇場中，可以共同體驗一趟有關愛與混亂的旅程！</p>
</div>

---

## 📝 作者的個人想法

<div class="article-list">
  <li>
    <a href="{{< ref "/docs/作者欄目/gender essay/_index.md" >}}">
      📌 關於《熱線》世界觀中的性別議題
    </a>
    <span class="article-date">2026.03.23</span>
  </li>
</div>

  <!-- 未來新增的隨筆可以在這裡繼續添加 -->
  <!-- <li><a href="#新文章標題"> 新文章標題</a><span class="article-date">2026.xx.xx</span></li> -->
</div>

---
