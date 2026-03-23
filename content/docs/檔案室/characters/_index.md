---
title: "人物檔案庫"
weight: 1
bookCollapseSection: true
---

<style>
/* 人物檔案庫專用樣式 */
.personnel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
}

.personnel-card {
  padding: 1rem;
  background: #fefefe;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.personnel-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

.personnel-name {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  border-left: 3px solid #9bb7d0;
  padding-left: 0.6rem;
}

.personnel-name small {
  font-weight: normal;
  font-size: 0.7rem;
  color: #6c8eae;
}

.personnel-ref {
  font-size: 0.75rem;
  color: #6c8eae;
  line-height: 1.5;
  margin-top: 0.4rem;
  padding-top: 0.3rem;
  border-top: 1px dashed #e2e8f0;
}

.personnel-ref a {
  color: #6c8eae;
  text-decoration: none;
}

.personnel-ref a:hover {
  color: #4a6b8a;
}

/* 分組標題 */
.group-title {
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid #e2e8f0;
}

.group-title h2 {
  font-size: 1.3rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
}

.group-title .group-desc {
  font-size: 0.8rem;
  color: #6c8eae;
  margin-top: 0.2rem;
}

/* 備註框 */
.author-note {
  background: #f8fafc;
  padding: 0.8rem 1rem;
  margin: 1.5rem 0;
  border-left: 3px solid #9bb7d0;
  font-size: 0.85rem;
  color: #4a6b8a;
  line-height: 1.6;
}

hr {
  border: none;
  border-top: 1px dashed #e2e8f0;
  margin: 1.5rem 0;
}

/* 腳註 */
.footnote {
  margin-top: 2rem;
  padding-top: 1rem;
  font-size: 0.7rem;
  color: #8ba0b0;
  border-top: 1px solid #e2e8f0;
  text-align: center;
}

/* ========== 角色專屬顏色類別 ========== */

/* 阿克韋洛：玫紅色 */
.personnel-card.color-akvilon .personnel-name {
  border-left-color: #c21e56;
  color: #ccc3dd;
}

/* 尤莎琳：冰藍色 */
.personnel-card.color-yuzharin .personnel-name {
  border-left-color: #6bc8e8;
  color: #ccc3dd;
}

/* 508小組成員 */
.personnel-card.color-haxo .personnel-name {
  border-left-color: #b1372d;
  color: #869d39;
}

.personnel-card.color-cadrill .personnel-name {
  border-left-color: #e74c3c;
  color: #704214;
}

.personnel-card.color-chandelar .personnel-name {
  border-left-color: #fbd13d;
  color: #757cbb;
}
</style>

# 人物檔案庫

這裏收錄了故事中的主要人物檔案！

---

## 來自露斯希亞的黑白雙子……我們的兩位主角

<div class="personnel-grid">
  <div class="personnel-card color-akvilon">
    <div class="personnel-name">
	    <a href="{{< relref "/docs/檔案室/characters/阿克韋洛.md" >}}" style="text-decoration: none; color: inherit;">
      阿克韋洛 · 阿遼諾維奇 · 科舒爾倪科夫<br>
      <small>Аквилон · Алёнович · Кошурников</small>
    </div>
    <div class="personnel-ref">
      雙子中的姐姐，尤莎琳的副官<br>
      日晷編號：AK-0729
    </div>
  </div>

  <div class="personnel-card color-yuzharin">
    <div class="personnel-name">
	    <a href="{{< relref "/docs/檔案室/characters/尤莎琳.md" >}}" style="text-decoration: none; color: inherit;">
      尤莎琳 · 阿遼諾維奇 · 科舒爾伊肅克<br>
      <small>Южарин · Алёнович · Кошур-ысук</small>
    </div>
    <div class="personnel-ref">
      雙子中的妹妹，阿克韋洛的長官<br>
      軌域編號：YZ-0729
    </div>
  </div>
</div>

<div class="author-note">
  <strong>📌 備註：</strong><br> 不知道這裏有沒有寶可夢愛好者會在讀過小説內容後覺得以上角色設定有些眼熟，但還是想在這裏説明一下 ┗|｀O′|┛<br><br>
  是的，他們的原型都來自於《寶可夢 黑／白》中登場的一對雙子角色——擔任「地下鐵總控官」的北尚與南廈。作者本人也在 AO3 上寫了十數篇有關他們的同人！……或者説，應該是「作者本人寫的其中一個列車長 AU（旅者Аквилон的生死觀） 是他們的原型」——現在他們與旅者AU已經在劇情設定上成為了莊周夢蝶的關係……
</div>

---

## 508號小組

<div class="personnel-grid">
  <div class="personnel-card color-chandelar">
    <div class="personnel-name">
      香德拉 · 露拉布哈<br>
      <small>Chandelar · Lulabre</small>
    </div>
    <div class="personnel-ref">
      遺罪子代之一，重刑犯「露拉布哈教授」的女兒。<br>
      日晷編號：CL-0609
    </div>
  </div>

  <div class="personnel-card color-cadrill">
    <div class="personnel-name">
      卡德里爾 · 多洛茲<br>
      <small>Cadrill · Doroz</small>
    </div>
    <div class="personnel-ref">
      遺罪子代之一，重刑犯「多洛茲領主」的女兒。<br>
      日晷編號：CD-0530
    </div>
  </div>

  <div class="personnel-card color-haxo">
    <div class="personnel-name">
      哈克索 · 托蘭切<br>
      <small>Haxo · Toranche</small>
    </div>
    <div class="personnel-ref">
      遺罪子代之一，重刑犯「托蘭切中校」的女兒。<br>
      日晷編號：HT-0612
    </div>
  </div>
</div>

<div class="author-note">
  <strong>📌 備註：</strong> <br>
  
  他們三位各自對應阿克韋洛的原型角色——北尚，在遊戲中所持有的寶可夢。
  - **Chandelar · Lulabre**：水晶燈火靈（原作日文原名：シャンデラ Chandela，結合官方法文翻譯：Lugulabre），日晷編號來自遊戲原作中對應寶可夢的全國編號 #0609
- **Cadrill · Doroz**：龍頭地鼠（原作日文原名：ドリュウズ Doryuzu，結合官方英文翻譯：Excadrill），日晷編號 #0530
- **Haxo · Toranche**：雙斧戰龍（官方英文翻譯：Haxorus，結合官方法文翻譯：Tranchodon），日晷編號 #0612
</div>

---


<div class="footnote">
  📅 最後更新 · 2026.03.23
</div>