//Dropdown
const listItems = document.getElementById('navbar').children

for (let i = 0; i < listItems.length; i++) {
  const item = listItems[i];
  const triangle = item.children[0].children[0]
  const dropdown = item.children[1]

  item.addEventListener('click', () => {
    triangle.classList.toggle('rotated')
    dropdown.classList.toggle('dropdown-list-shown')
  })

}



//Mobile Menu

const allNavs = document.getElementById('mobile-nav').children

const photosDiv = document.getElementById('photos-content')
const photosNav = document.getElementById('photos-nav')

const videosDiv = document.getElementById('videos-content')
const videosNav = document.getElementById('photos-nav')

const newsDiv = document.getElementById('news-content')
const newsNav = document.getElementById('news-nav')

const memesDiv = document.getElementById('memes-content')
const memesNav = document.getElementById('memes-nav')

const allDivs = [photosDiv, videosDiv, newsDiv, memesDiv]

const removeSelectedFromAll = function() {
  for (let i = 0; i < allNavs.length; i++) {
    const nav = allNavs[i];
    nav.classList.remove('selected')
  }
}

const addHiddenToAll = function() {
  allDivs.forEach(div => {
    div.classList.add('hidden')
  })
}

for (let i = 0; i < allNavs.length; i++) {
  const nav = allNavs[i];
  const div = allDivs[i]
  nav.addEventListener('click', () => {
    removeSelectedFromAll()
    addHiddenToAll()
    nav.classList.add('selected')
    div.classList.remove('hidden')
  })
}



//Image Slider

const leftButton = document.getElementById('image-left')
const rightButton = document.getElementById('image-right')
const dots = document.getElementById('image-dots').children
const allImages = document.getElementById('images').children

const exitRight = function(image) {
  image.classList.add('exit-right')
  setTimeout(() => {
    image.classList.remove('exit-right')
    image.classList.add('hidden-image')
  }, 500)
}

const exitLeft = function(image) {
  image.classList.add('exit-left')
  setTimeout(() => {
    image.classList.remove('exit-left')
    image.classList.add('hidden-image')
  }, 500)
}

const enterRight = function(image) {
  console.log('enter-right')
  image.classList.remove('hidden-image')
  image.classList.add('enter-right')
  setTimeout(() => {image.classList.remove('enter-right')}, 500)
}

const enterLeft = function(image) {
  console.log('enter-right')
  image.classList.remove('hidden-image')
  image.classList.add('enter-left')
  setTimeout(() => {image.classList.remove('enter-left')}, 500)
}

const getCurrentImage = function() {
  let currentImage
  for (let i = 0; i < allImages.length; i++) {
    const image = allImages[i];
    if (!(image.classList.contains('hidden-image'))) {
      currentImage = image
    }
  }

  return currentImage
}

const indexOfImage = function (imageInput) {
  let index
  for (let i = 0; i < allImages.length; i++) {
    const image = allImages[i];
    if (image == imageInput) {
      index = i
    }
  }
  return index
}

const fillDotAndEmptyOthers = function(dotIndex) {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.children[0].classList.remove('inner-dot')
  }

  dots[dotIndex].children[0].classList.add('inner-dot')
}


leftButton.addEventListener('click', () => {
  let indexOfCurrentImage = indexOfImage(getCurrentImage())

  if (indexOfCurrentImage == 0) {
    indexOfCurrentImage += allImages.length
  }

  fillDotAndEmptyOthers(indexOfCurrentImage - 1)

  exitRight(getCurrentImage())

  enterLeft(allImages[indexOfCurrentImage - 1])
  //fillDotAndEmptyOthers(indexOfCurrentImage)
})

rightButton.addEventListener('click', () => {
  let indexOfCurrentImage = indexOfImage(getCurrentImage())
  let currentImage = getCurrentImage()

  if (indexOfCurrentImage >= allImages.length - 1) {
    indexOfCurrentImage -= allImages.length
  }

  fillDotAndEmptyOthers(indexOfCurrentImage + 1)

  exitLeft(currentImage)
  enterRight(allImages[indexOfCurrentImage + 1])

})

for (let i = 0; i < dots.length; i++) {
  const dot = dots[i];
  dot.addEventListener('click', () => {
    let currentImageIndex = indexOfImage(getCurrentImage())
    let dotIndex 
    for (let i = 0; i < dots.length; i++) {
      const loopDot = dots[i];
      if (loopDot == dot) {
        dotIndex = i
      }
    }

    if (dotIndex == indexOfImage(getCurrentImage())) {return}

    if (currentImageIndex < dotIndex) {
      exitLeft(getCurrentImage())
      enterRight(allImages[dotIndex])
      fillDotAndEmptyOthers(dotIndex)
    }
    else {
      exitRight(getCurrentImage())
      enterLeft(allImages[dotIndex])
      fillDotAndEmptyOthers(dotIndex)
    }
  })
}


var inactivityTime = function () {
  var time
  window.onload = resetTimer
  // DOM Events
  document.onclick = resetTimer
  document.onscroll = resetTimer
  function slide() {
      rightButton.click()
      //location.href = 'logout.html'
  }

  function resetTimer() {
      clearTimeout(time)
      time = setTimeout(slide, 5000)
      // 1000 milliseconds = 1 second
  }
}

window.onload = () => {
  inactivityTime()
}