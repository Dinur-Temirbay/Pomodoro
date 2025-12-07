if ('Notification' in window && Notification.permission !== 'granted') {
	Notification.requestPermission()
}

let time = 25 * 60
let timerId = null

const timeEl = document.getElementById('time')
const progress = document.querySelector('.progress-bar')

function updateTime() {
	let m = Math.floor(time / 60)
	let s = time % 60
	timeEl.textContent = `${m}:${s < 10 ? '0' + s : s}`

	let progressValue = 628 - 628 * (time / (25 * 60))
	progress.style.strokeDashoffset = progressValue
}

function startTimer() {
	if (timerId) return
	timerId = setInterval(() => {
		if (time > 0) {
			time--
			updateTime()
		} else {
			clearInterval(timerId)
			timerId = null
			showNotification()
		}
	}, 1000)
}

function pauseTimer() {
	clearInterval(timerId)
	timerId = null
}

function resetTimer() {
	clearInterval(timerId)
	timerId = null
	time = 25 * 60
	updateTime()
}

function showNotification() {
	if ('Notification' in window && Notification.permission === 'granted') {
		new Notification('Pomodoro Timer', {
			body: 'Время истекло! Сделай перерыв ☕',
			icon: 'pomodoro.png',
		})
	} else {
		alert('Время истекло! Сделай перерыв ☕')
	}
}

document.getElementById('start').onclick = startTimer
document.getElementById('pause').onclick = pauseTimer
document.getElementById('reset').onclick = resetTimer

updateTime()
