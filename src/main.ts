import './style.styl'

const $app = document.querySelector('#app') as HTMLElement
const $ul = document.createElement('ul') as HTMLUListElement
const $texts = document.createElement('section') as HTMLElement
const $shapes = document.createElement('section') as HTMLElement
const $currentShape = document.createElement('article') as HTMLElement

$texts.className = 'texts'
$shapes.className = 'shapes'
$currentShape.className = 'currentShape'

const words = [
  ['semantic', 'link', 'hypertext', 'dataset', 'markup'],
  ['alignement', 'responsive', 'color', 'animation', 'cubic-bezier'],
  ['querySelector', 'onload', 'event', 'delay', 'functional']
]

type Shape = 'rhombus' | 'octagon' | 'pentagon'
const clipPaths: Record<Shape, string> = {
  rhombus:
    '50% 0,  50%   0, 100% 50%, 100% 50%, 50% 100%, 50% 100%, 0 50%, 0 50%',
  octagon:
    '30% 0,  70%   0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%',
  pentagon:
    '40% 0, 100% 20%, 100% 20%, 100% 80%, 100% 80%, 40% 100%, 0 50%, 0 50%'
}
const shapes = Object.keys(clipPaths) as Shape[]
const degrees = [0, 45, 90]

shapes.forEach((shape: Shape, i) => {
  const $li = document.createElement('li')
  const isFirst = !i
  const isLast = i === shapes.length - 1

  $li.style.cssText = `
    clip-path: polygon(${clipPaths[shape]});
    ${isLast && 'transform: rotate(90deg);'}
  `
  isFirst && $li.classList.add('isActive')

  $ul.appendChild($li)
})

type Topic = 'html' | 'css' | 'js'
const topicColors: Record<Topic, string> = {
  html: '#e42',
  css: '#24e',
  js: '#fd4'
}
const topics = Object.keys(topicColors) as Topic[]

topics.forEach(topic => {
  const $article = document.createElement('article')
  const $p = document.createElement('p')

  $article.style.background = topicColors[topic]
  $p.textContent = topic

  $article.appendChild($p)
  $currentShape.appendChild($article)
})

let current = 0
const goToNext = () => {
  $ul.querySelectorAll('li').forEach(($li, i) => {
    $li.classList.toggle('isActive', i === current)
  })
  setTimeout(() => {
    current = (current + 1) % shapes.length
  }, 0)

  $texts.querySelectorAll('article').forEach(($article, i) => {
    $article.style.cssText = `
      transform: translateX(${current * 33.3}%);
      transition-delay: ${i * 0.05}s;
    `
  })

  updateActiveShape()
  updateBodyBackground()
}

const updateBodyBackground = () => {
  document.body.style.background = topicColors[topics[current]]
}

const updateActiveShape = () => {
  $currentShape.style.cssText = `
    clip-path: polygon(${clipPaths[shapes[current]]});
    transform: rotate(${degrees[current]}deg);
  `
  $currentShape.querySelectorAll('article').forEach(($article, i) => {
    $article.style.opacity = i === current ? '1' : '0'
  })
}

const mix = (_: unknown, i: number) => words.reverse().map(row => row[i])
words[0].map(mix).forEach((article, i) => {
  const $article = document.createElement('article')
  $article.style.cssText = `transition-delay: ${i * 0.2}s;`

  article.forEach(word => {
    const $span = document.createElement('span')
    $span.textContent = word

    $article.appendChild($span)
  })

  $texts.appendChild($article)
})

$shapes.appendChild($currentShape)
$shapes.appendChild($ul)
$app.appendChild($texts)
$app.appendChild($shapes)

window.onload = goToNext
$app.onclick = goToNext
