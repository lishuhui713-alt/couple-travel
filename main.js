function go(placeId) {
  // 获取内容容器
  const container = document.getElementById("place-content");
  
  // 先移除 show 类，让上一次内容淡出
  container.classList.remove("show");

  // 小延迟，保证动画能触发
  setTimeout(() => {
    fetch(`data/places/${placeId}.json`)
      .then(res => res.json())
      .then(data => {
        renderPlaceContent(data);
        // 添加 show 类，触发渐显 + 呼吸动画
        container.classList.add("show");
      })
      .catch(err => {
        console.error("读取地点内容失败:", err);
        container.innerHTML = "<p>请检查 JSON 文件路径</p>";
      });
  }, 100); // 100ms 延迟让动画生效
}

function renderPlaceContent(data) {
  const container = document.getElementById("place-content");
  container.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.intro}</p>
    ${data.blocks.map(b => `
      <div class="block">
        <h3>${b.title}</h3>
        <p>${b.content}</p>
      </div>
    `).join("")}
  `;
}
