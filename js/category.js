window.onload = function() {
  // 左侧滑动
  leftSwipe()

  // 右侧滑动
  rightSwipe()
}

let leftSwipe = function() {
  /**
   * 1.上下滑动  （touch事件，位移）
   */

  // let parentBox = document.querySelector('.cate-left')

  // let childBox = parentBox.querySelector('ul')

  // let startY = 0
  // let distanceY = 0
  // let currentY = 0

  // childBox.addEventListener('touchstart', function(e) {
  //   startY = e.touches[0].clientY
  // })
  // childBox.addEventListener('touchmove', function(e) {
  //   let moveY = e.touches[0].clientY
  //   distanceY = moveY - startY
  //   let translateY = currentY + distanceY
  //   childBox.style.transform = `translateY(${translateY}px)`
  //   childBox.style.webkitTransform = `translateY(${translateY}px)`
  // })
  // childBox.addEventListener('touchend', function(e) {
  //   currentY += distanceY
  //   console.log(currentY)
  //   if (currentY > 0) {
  //     currentY = 0
  //     childBox.style.transform = `translateY(${currentY}px)`
  //     childBox.style.webkitTransform = `translateY(${currentY}px)`
  //   }
  // })

  new IScroll(document.querySelector('.cate-left'))
}

let rightSwipe = function() {
  new IScroll(document.querySelector('.cate-right'))
}
