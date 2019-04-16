window.onload = function() {
	searchInit()
	bannerInit()
	downTimeInit()
}

function searchInit() {
	let searchBox = document.querySelector('.search-box')
	let bannerBox = document.querySelector('.jd-banner')

	window.onscroll = function() {
		let top = document.body.scrollTop || document.documentElement.scrollTop
		let height = bannerBox.offsetHeight
		let opacity = 0
		if (top > height) {
			opacity = 0.8
		} else {
			opacity = 0.8 * (top / height)
		}
		searchBox.style.background = `rgba(216, 80, 92, ${opacity})`
	}
}

let t
let index = 2

function bannerInit() {
	t = setInterval(() => {
		document
			.querySelector(`.jd-banner ul:last-child li:nth-child(${index})`)
			.click()
		if (index++ % 8 === 0) {
			index = 1
		}
	}, 3000)
}

function clickHandler(event, n) {
	document.querySelector(
		'.jd-banner ul:first-child'
	).style.transform = `translateX(${n * -12.5}%)`
	document
		.querySelector('.jd-banner ul:last-child li.current')
		.classList.remove('current')
	event.target.classList.add('current')
}

function mouseOver() {
	clearInterval(t)
}

function mouseOut() {
	t = setInterval(() => {
		document
			.querySelector(`.jd-banner ul:last-child li:nth-child(${index})`)
			.click()
		if (index++ % 8 === 0) {
			index = 1
		}
	}, 3000)
}

function downTimeInit() {}
