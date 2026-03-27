const http = require('http')

const PORT = 3000

// shared styles
const css = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; }
  .nav { background: #1e293b; padding: 14px 30px; display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #334155; }
  .nav a { color: #94a3b8; text-decoration: none; font-size: 0.88rem; font-weight: 600; padding: 5px 12px; border-radius: 6px; }
  .nav a:hover { color: #f9a826; background: rgba(249,168,38,0.1); }
  .nav .brand { color: #f9a826; font-weight: 800; font-size: 1.1rem; margin-right: auto; }
  .container { max-width: 650px; margin: 50px auto; padding: 0 25px; }
  .card { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 30px; margin-bottom: 16px; }
  h1 { color: #f9a826; font-size: 1.6rem; margin-bottom: 8px; }
  h2 { color: #f9a826; font-size: 1.1rem; margin-bottom: 8px; }
  p { color: #94a3b8; line-height: 1.7; margin-bottom: 6px; font-size: 0.92rem; }
  .big-text { font-size: 3rem; font-weight: 800; color: #f9a826; margin: 15px 0; }
  .tag { display: inline-block; background: rgba(249,168,38,0.15); color: #f9a826; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; margin: 3px 3px 3px 0; }
  .route-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
  .route-card { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px; text-decoration: none; transition: all 0.2s; }
  .route-card:hover { border-color: #f9a826; }
  .route-card h3 { color: #e2e8f0; font-size: 0.9rem; margin-bottom: 4px; }
  .route-card p { font-size: 0.78rem; color: #64748b; }
  .route-card .path { color: #f9a826; font-size: 0.78rem; font-weight: 700; }
  .info-row { display: flex; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid #334155; }
  .info-row:last-child { border-bottom: none; }
  .info-icon { font-size: 1.4rem; width: 40px; text-align: center; }
  .info-label { font-size: 0.75rem; color: #64748b; }
  .info-value { color: #e2e8f0; font-size: 0.9rem; font-weight: 600; }
  .footer { text-align: center; color: #475569; font-size: 0.75rem; margin-top: 40px; padding-bottom: 30px; }
`

function nav() {
  return `
    <div class="nav">
      <span class="brand">HelloServer</span>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/time">Time</a>
      <a href="/greet?name=Swara">Greet</a>
    </div>
  `
}

function page(title, body) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Hello Server</title>
      <style>${css}</style>
    </head>
    <body>
      ${nav()}
      <div class="container">
        ${body}
      </div>
    </body>
    </html>
  `
}

const server = http.createServer(function(req, res) {
  let url = req.url

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(page('Home', `
      <div class="card">
        <p style="color: #f9a826; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Node.js Server</p>
        <h1 style="font-size: 2rem; margin: 8px 0;">Hello Server</h1>
        <p>A simple Node.js server that returns different messages on different routes. Built using the built-in <span class="tag">http</span> module — no Express needed.</p>
      </div>
      <h2>Available Routes</h2>
      <div class="route-grid">
        <a href="/about" class="route-card">
          <h3>About</h3>
          <p>Learn about this server</p>
          <span class="path">GET /about</span>
        </a>
        <a href="/contact" class="route-card">
          <h3>Contact</h3>
          <p>Get in touch</p>
          <span class="path">GET /contact</span>
        </a>
        <a href="/time" class="route-card">
          <h3>Time</h3>
          <p>Current server time</p>
          <span class="path">GET /time</span>
        </a>
        <a href="/greet?name=Swara" class="route-card">
          <h3>Greet</h3>
          <p>Personalized greeting</p>
          <span class="path">GET /greet?name=</span>
        </a>
      </div>
    `))
  }

  else if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(page('About', `
      <h1>About This Server</h1>
      <div class="card">
        <p>This server was created as part of the <strong style="color: #e2e8f0;">SuprMentr Full Stack Web Development Internship</strong>.</p>
        <p>It demonstrates how Node.js can handle HTTP requests and respond with different content based on the URL route.</p>
        <div style="margin-top: 15px;">
          <span class="tag">Node.js</span>
          <span class="tag">HTTP Module</span>
          <span class="tag">Routing</span>
          <span class="tag">Server-Side</span>
        </div>
      </div>
      <div class="card">
        <h2>How It Works</h2>
        <p>1. Client sends a request to a URL</p>
        <p>2. Server reads the URL path</p>
        <p>3. Matches it to a route handler</p>
        <p>4. Sends back the appropriate HTML response</p>
      </div>
    `))
  }

  else if (url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(page('Contact', `
      <h1>Contact</h1>
      <div class="card">
        <div class="info-row">
          <span class="info-icon">👤</span>
          <div>
            <div class="info-label">Name</div>
            <div class="info-value">Swara Shetty M</div>
          </div>
        </div>
        <div class="info-row">
          <span class="info-icon">📧</span>
          <div>
            <div class="info-label">Email</div>
            <div class="info-value">swarashetty761@gmail.com</div>
          </div>
        </div>
        <div class="info-row">
          <span class="info-icon">📍</span>
          <div>
            <div class="info-label">Location</div>
            <div class="info-value">Bengaluru, Karnataka</div>
          </div>
        </div>
        <div class="info-row">
          <span class="info-icon">🎓</span>
          <div>
            <div class="info-label">College</div>
            <div class="info-value">Global Academy of Technology</div>
          </div>
        </div>
      </div>
    `))
  }

  else if (url === '/time') {
    let now = new Date()
    let timeStr = now.toLocaleTimeString()
    let dateStr = now.toLocaleDateString()
    let day = now.toLocaleDateString('en-US', { weekday: 'long' })
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(page('Time', `
      <h1>Server Time</h1>
      <div class="card" style="text-align: center;">
        <p style="color: #64748b; font-size: 0.82rem;">${day}</p>
        <div class="big-text">${timeStr}</div>
        <p style="font-size: 1rem; color: #94a3b8;">${dateStr}</p>
        <p style="margin-top: 15px; font-size: 0.8rem; color: #475569;">This time is generated on the server each time you load this page. Refresh to see it update!</p>
      </div>
    `))
  }

  else if (url.startsWith('/greet')) {
    let params = new URL('http://localhost' + url).searchParams
    let name = params.get('name') || 'Stranger'

    let greetings = ['Hey', 'Hello', 'Hi there', 'Welcome', 'Namaste']
    let randomGreet = greetings[Math.floor(Math.random() * greetings.length)]

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(page('Greet', `
      <div class="card" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 10px;">👋</div>
        <h1 style="font-size: 2rem;">${randomGreet}, ${name}!</h1>
        <p>Welcome to the server. Nice to meet you!</p>
        <p style="margin-top: 15px; font-size: 0.8rem; color: #475569;">Try changing the name in the URL: <span class="tag">/greet?name=YourName</span></p>
      </div>
    `))
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end(page('404', `
      <div class="card" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h1 style="color: #ef4444;">404</h1>
        <p>The route <span class="tag">${url}</span> does not exist on this server.</p>
        <a href="/" style="display: inline-block; margin-top: 15px; background: #f9a826; color: #0f172a; padding: 8px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.88rem;">Back to Home</a>
      </div>
    `))
  }
})

server.listen(PORT, function() {
  console.log('Server running at http://localhost:' + PORT)
})