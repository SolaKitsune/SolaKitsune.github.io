document.addEventListener('DOMContentLoaded', function() {
  // 为所有包含子菜单的项添加折叠功能
  document.querySelectorAll('.book-menu li').forEach(function(li) {
    if (li.querySelector('ul')) {
      li.classList.add('menu-item-has-children');
      
      // 为父级链接添加点击事件（仅当点击的是链接本身）
      const link = li.querySelector('a');
      if (link) {
        link.addEventListener('click', function(e) {
          // 阻止默认跳转，只触发折叠
          e.preventDefault();
          li.classList.toggle('active');
        });
      }
    }
  });
});