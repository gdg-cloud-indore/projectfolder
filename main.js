const main = document.querySelector('main')

projects.forEach(pro => {
  let repo = pro.projectrepo
  let url = 'https://api.github.com/repos/' + repo

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.mercy-preview+json',
    },
  })
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      const user = 'sd'
      const newDiv = document.createElement('div')

      newDiv.classList.add('repo-card')

      newDiv.innerHTML = `
      <div class="repo-details">
      <span class="repo-name"
        ><a href="${json.html_url}"> <h2>${json.name}</h2></a></span
      >
      <span class="repo-description"
        >${json.description}</span
      >
      <div class="repo-topics topics-${json.name}">
      
        </div>
      <div class="repo-counts">
        <span><i class="fas fa-balance-scale"></i>&nbsp;${
          json.license ? json.license.name : 'None'
        }</span>
        <span><i class="fas fa-code-branch"></i>&nbsp;${json.forks_count}</span>
        <span><i class="fas fa-star"></i>&nbsp;${json.stargazers_count}</span>
        <span>Updated ${
          Math.round(
            (new Date() - new Date(json.updated_at)) / (1000 * 3600 * 24),
          ) === 0
            ? Math.round(
                (new Date() - new Date(json.updated_at)) / (1000 * 3600),
              ) === 0
              ? Math.round(
                  (new Date() - new Date(json.updated_at)) / (1000 * 60),
                )
              : Math.round(
                  (new Date() - new Date(json.updated_at)) / (1000 * 3600),
                )
            : Math.round(
                (new Date() - new Date(json.updated_at)) / (1000 * 3600 * 24),
              )
        } ${
        Math.round(
          (new Date() - new Date(json.updated_at)) / (1000 * 3600 * 24),
        ) === 0
          ? Math.round(
              (new Date() - new Date(json.updated_at)) / (1000 * 3600),
            ) === 0
            ? 'minutes'
            : 'hours'
          : 'days'
      } ago</span>
      </div>
    </div>
    <hr />
    <div class="repo-contributors ">
      <span>Contributors</span>
      <div class="contributors-gravatar contributor-${json.name}">
        
      </div>
    </div>
    <hr />
    <div class="repo-owner">
      <img class="user-image" id="image-${pro.profile}-${
        json.name
      }" src="" alt="" width="150"/>
      <span class="user-github">
        <a href="https://github.com/${
          pro.profile
        }"> <i class="fab fa-github"></i>&nbsp;Github </a></span
      >
      <span class="user-contact">
        <i class="fas fa-phone"></i>&nbsp;${pro.contact}</span
      >
    </div>
  
      `

      main.appendChild(newDiv)

      const repotopics = document.querySelector('.topics-' + json.name)

      json.topics.forEach(topic => {
        const newSpan = document.createElement('span')
        newSpan.innerHTML = topic
        repotopics.appendChild(newSpan)
      })

      const repocontributors = document.querySelector(
        '.contributor-' + json.name,
      )
      fetch(json.contributors_url, {
        method: 'GET',
      })
        .then(resp => {
          return resp.json()
        })
        .then(contributorjson => {
          contributorjson.forEach(contri => {
            const newLink = document.createElement('a')
            newLink.href = contri.html_url

            newLink.innerHTML = `<img src="${contri.avatar_url}" width="40">`

            repocontributors.appendChild(newLink)
          })
        })
        .catch(err => {
          console.log(err)
        })

      const userimage = document.getElementById(
        'image-' + pro.profile + '-' + json.name,
      )
      fetch('https://api.github.com/users/' + pro.profile, {
        method: 'GET',
      })
        .then(resp => {
          return resp.json()
        })
        .then(userjson => {
          userimage.src = userjson.avatar_url
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
})

setInterval(() => {
  document.querySelector('.loader-container').style.display = 'none'
  document.querySelector('.content').style.display = 'block'
}, 1500)
