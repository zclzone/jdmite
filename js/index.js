window.onload = function() {
  // 初始化页面功能
  // 搜索
  searchInit()
  // 轮播图
  bannerInit()
  // 倒计时
  downTimeInit()
}

let searchInit = function() {
  /**
   * 1.页面初始化的时候  距离顶部是0的距离的时候
   * 2.当页面滚动的时候，随着页面距离顶部的距离变大，透明度变大
   * 3.当滚动的距离超过了轮播图的距离的时候  保持不变
   */

  let searchBox = document.querySelector('.search-box')
  let bannerBox = document.querySelector('.jd-banner')

  // 距离范围
  let height = bannerBox.offsetHeight

  // 透明度
  let opacity = 0

  // 监听滚动时间
  window.onscroll = function() {
    // 获取当前页面滚动的距离
    let top = document.body.scrollTop || document.documentElement.scrollTop
    if (top > height) {
      opacity = 0.8
    } else {
      opacity = 0.8 * (top / height)
    }
    // 设置颜色给搜索盒子
    searchBox.style.background = `rgba(216, 80, 92, ${opacity})`
  }
}

let bannerInit = function() {
  /**
   * 1.无缝滚动&滑动（定时器 过渡 位移）
   * 2.点盒子对应改变（改变当前样式）
   * 3.可以滑动（移动端touch事件  监听触摸点坐标改变距离 位移）
   * 4.当滑动距离不够时 吸附回去（过渡 位移）
   * 5当滑动距离够了的时候 切换图片（判断方向  过渡 位移）
   */

  // 获取需要操作的dom元素
  let bannerBox = document.querySelector('.jd-banner') //大容器
  let imgBox = bannerBox.querySelector('ul:first-child') //图片容器
  let pointBox = bannerBox.querySelector('ul:last-child') //点容器
  let points = pointBox.querySelectorAll('li') //所有的点
  let width = bannerBox.offsetWidth

  /* 提取公用方法 */
  //加过渡
  let addTransition = function() {
    imgBox.style.transition = 'all 0.2s'
    imgBox.style.webkitTransition = 'all 0.2s' //兼容
  }

  //清过渡
  let removeTransition = function() {
    imgBox.style.transition = 'none'
    imgBox.style.webkitTransition = 'none'
  }

  //设置位移
  let setTranslateX = function(translateX) {
    imgBox.style.transform = `translateX(${translateX}px)`
    imgBox.style.webkitTransform = `translateX(${translateX}px)` //兼容
  }

  //设置点盒子样式
  let setPotint = function(nowIndex) {
    // 去除所有的current样式
    for (const point of points) {
      point.classList.remove('current')
    }
    points[nowIndex].classList.add('current')
  }

  /* 1.无缝滚动&滑动（定时器 过渡 位移） */
  let index = 1
  let timer = setInterval(() => {
    index++
    // 过渡
    addTransition()
    // 位移
    setTranslateX(-index * width)
  }, 3000)

  /* 监听过渡结束时间点，过渡结束事件 */
  imgBox.addEventListener('transitionend', () => {
    if (index >= 9) {
      /* 瞬间定位到第一张 */
      index = 1
    } else if (index <= 0) {
      /* 瞬间定位到第八张 */
      index = 8
    }
    // 清除过渡
    removeTransition()
    // 定位
    setTranslateX(-index * width)

    /* 2.点盒子样式对应改变（改变当前样式）*/
    setPotint(index - 1)
  })

  /* 3.可以滑动（移动端touch事件  监听触摸点坐标改变距离 位移） */
  let startX = 0 //滑动开始的位置（X坐标）.
  let distanceX = 0 //记录滑动的的距离
  let isMove = false //为了严禁  判断是否滑动

  imgBox.addEventListener('touchstart', function(e) {
    // 清除定时器
    clearInterval(timer)
    startX = e.touches[0].clientX
  })
  imgBox.addEventListener('touchmove', function(e) {
    let moveX = e.touches[0].clientX
    distanceX = moveX - startX //当distanceX大于0时 表示向右滑动   distanceX小于0时 表示向左滑动

    /* 滑动   基于当前位置计算将要定位的位置 */
    let tranxlateX = -index * width + distanceX
    // 清除过渡
    removeTransition()
    // 设置定位
    setTranslateX(tranxlateX)
    isMove = true
  })
  imgBox.addEventListener('touchend', function(e) {
    if (isMove) {
      if (Math.abs(distanceX) < width / 3) {
        /* 4.当滑动距离不够时 吸附回去（过渡 位移） */
        addTransition()
        setTranslateX(-index * width)
      } else {
        /* 5当滑动距离够了的时候 切换图片（判断方向  过渡 位移） */

        if (distanceX > 0) {
          // 向右滑  上一张
          index--
        } else {
          // 向左滑，下一张
          index++
        }
        if (index >= 9) {
          /* 瞬间定位到第一张 */
          index = 1
        } else if (index <= 0) {
          /* 瞬间定位到第八张 */
          index = 8
        }
        addTransition()
        setTranslateX(-index * width)
        setPotint(index - 1)
      }
    }

    // 加定时器
    // 严谨操作，一律先清除定时器再加，保证只存在一个定时器
    clearInterval(timer)
    timer = setInterval(() => {
      index++
      // 过渡
      addTransition()
      // 位移
      setTranslateX(-index * width)
    }, 3000)

    // 重置参数
    startX = 0
    distanceX = 0
    isMove = false
  })
}
let downTimeInit = function() {
  /**
   * 1.模拟倒计时的时间  11个小时
   * 2.利用定时器 1 秒一次  重新展示时间
   */

  let time = 11

  let skTime = document.querySelector('.sk-time')
  let spans = skTime.querySelectorAll('span')
  let timer = setInterval(() => {
    time--
    //格式化时间
    let h = Math.floor(time / 3600)
    let m = Math.floor((time % 3600) / 60)
    let s = time % 60

    spans[0].innerHTML = Math.floor(h / 10)
    spans[1].innerHTML = h % 10
    spans[3].innerHTML = Math.floor(m / 10)
    spans[4].innerHTML = m % 10
    spans[6].innerHTML = Math.floor(s / 10)
    spans[7].innerHTML = s % 10
    if (time <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
