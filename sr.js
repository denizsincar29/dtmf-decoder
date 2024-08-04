/* srSpeak(text, priority)
    text: the message to be vocalised
    priority (non mandatory): "polite" (by default) or "assertive" */

function srSpeak(text, priority) {
    var el = document.createElement('div')
    var id = 'speak-' + Date.now()
    el.setAttribute('id', id)
    el.setAttribute('aria-live', priority || 'polite')
    el.classList.add('visually-hidden')
    document.body.appendChild(el)

    window.setTimeout(function () {
        document.getElementById(id).innerHTML = text
    }, 100)

    window.setTimeout(function () {
        document.body.removeChild(document.getElementById(id))
    }, 1000)
}

function speak(text) {
    document.getElementById('statusbar').innerHTML = text
}


export { srSpeak, speak }