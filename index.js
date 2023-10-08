const ul = document.getElementById('ul')
const findInput = document.getElementById('findInput')
const testBtn = document.getElementById('testBtn')

const fetchData = async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
  }
}

const createLiElement = (liElement) => {
  const li = document.createElement('li')
  const serial = document.createElement('span')
  const path = document.createElement('span')
  const file = document.createElement('div')
  const time = document.createElement('div')
  const link = document.createElement('a')
  serial.innerHTML = liElement.id
  serial.classList.add("serial")
  path.innerHTML = liElement.path
  path.classList.add("path")
  file.innerHTML = liElement.filename
  file.classList.add("file")
  time.innerHTML = liElement.time
  time.classList.add('time')
  link.innerHTML = 'Ссылка YouTube'
  link.classList.add('link')
  link.href = `https://www.youtube.com/results?search_query=${liElement.filename}`
  li.append(serial, path, file, time, link)
  li.classList.add("li")
  return li
}

findInput.addEventListener('input', (e) => { render() })
findInput.addEventListener('paste', (e) => { render() })

testBtn.addEventListener('click', () => {
  findInput.value = ''
  render()
})

function render() {
  fetchData()
    .then(() => {
      const removePromises = Array.from(ul.childNodes).map(element => {
        return new Promise((resolve) => {
          element.remove();
          resolve();
        });
      });
      return Promise.all(removePromises);
    })
    .then(() => {
      return fetchData();
    })
    .then(data => {
      data.forEach((liData) => {
        const filename = liData.filename.toLowerCase()
        const inputName = findInput.value.toLowerCase()
        if (filename.includes(inputName)) {
          ul.append(createLiElement(liData))
        }
      });
    });
}

render()
