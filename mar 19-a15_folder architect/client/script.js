function loadStudents() {
    let list = document.getElementById('studentList')
    let status = document.getElementById('status')
    let btn = document.getElementById('loadBtn')

    list.innerHTML = ''
    status.textContent = 'Loading...'
    btn.disabled = true

    fetch('http://localhost:3000/api/users')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status)
            }
            return response.json()
        })
        .then(function (students) {
            status.textContent = 'Loaded ' + students.length + ' students'
            btn.textContent = 'Refresh'
            btn.disabled = false

            for (let i = 0; i < students.length; i++) {
                let card = document.createElement('div')
                card.className = 'student-card'
                card.innerHTML = `
                    <div>
                        <h3>${students[i].name}</h3>
                        <p>${students[i].role}</p>
                    </div>
                    <span class="badge">${students[i].batch}</span>
                `
                list.appendChild(card)
            }
        })
        .catch(function (err) {
            status.textContent = 'Error: ' + err.message + ' — Make sure the server is running (npm start)'
            btn.disabled = false
        })
}
