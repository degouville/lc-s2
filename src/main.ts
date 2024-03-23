import './style.styl'

const $app = document.querySelector('#app') as HTMLElement
const $ul = document.createElement('ul') as HTMLUListElement
const $shapes = document.createElement('section') as HTMLElement
const $currentShape = document.createElement('article') as HTMLElement

$shapes.className = 'shapes'
$currentShape.className = 'currentShape'

type Shape = 'rhombus' | 'octagon' | 'pentagon'
const clipPaths: Record<Shape, string> = {
  rhombus:
    '50% 0,  50%   0, 100% 50%, 100% 50%, 50% 100%, 50% 100%, 0 50%, 0 50%',
  octagon:
    '30% 0,  70%   0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%',
  pentagon:
    '35% 0, 100% 25%, 100% 25%, 100% 75%, 100% 75%, 35% 100%, 0 50%, 0 50%'
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

$shapes.appendChild($currentShape)
$shapes.appendChild($ul)
$app.appendChild($shapes)

window.onload = goToNext
$app.onclick = goToNext
