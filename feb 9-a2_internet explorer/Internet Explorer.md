# Assignment 1: Internet Explorer

**Date:** 09 February 2026
**Description:** Draw and explain the client-server architecture and trace what happens when you open a website.

---

## Part 1: Client-Server Architecture

The client-server architecture is the foundational model of how the web works. It describes the relationship between two types of computers that communicate over a network: the client (which requests information) and the server (which provides it).

### Architecture Diagram

```
┌─────────────────┐                         ┌─────────────────┐
│     CLIENT      │                         │     SERVER      │
│  (Your Browser) │                         │ (Remote Machine)│
│                 │   ── HTTP Request ──►   │                 │
│  - Chrome       │                         │  - Web Server   │
│  - Firefox      │   ◄── HTTP Response ──  │    (Node.js,    │
│  - Edge         │                         │     Apache)     │
│                 │                         │                 │
│  Renders:       │                         │  Processes:     │
│  HTML, CSS, JS  │                         │  Logic, Auth,   │
│  (Frontend)     │                         │  APIs (Backend) │
└─────────────────┘                         └────────┬────────┘
                                                     │
                                                     │ Queries
                                                     ▼
                                            ┌─────────────────┐
                                            │    DATABASE      │
                                            │  (MongoDB, etc.) │
                                            │                  │
                                            │  Stores:         │
                                            │  User data,      │
                                            │  Content, Files  │
                                            └──────────────────┘
```

### 1.1 What is a Client?

A client is any device or application that sends requests to a server. In the context of the web, the most common client is a web browser (such as Google Chrome, Mozilla Firefox, or Microsoft Edge). The client is responsible for:

- Sending HTTP requests to the server
- Receiving HTTP responses (HTML, CSS, JavaScript files)
- Rendering the received files into a visual webpage the user can interact with
- Handling user interactions (clicks, form submissions, scrolling)

### 1.2 What is a Server?

A server is a remote computer that listens for incoming requests and responds with the appropriate data. Web servers run software like Node.js, Apache, or Nginx. The server is responsible for:

- Listening for and accepting HTTP requests from clients
- Processing business logic (authentication, calculations, data validation)
- Communicating with the database to fetch or store data
- Sending back HTTP responses with the requested resources

### 1.3 What is a Database?

A database is a structured system for storing, retrieving, and managing data persistently. Examples include MongoDB, MySQL, and PostgreSQL. The database is responsible for:

- Storing user data, content, files, and application state
- Responding to queries from the server (read, write, update, delete)
- Ensuring data integrity and security

---

## Part 2: What Happens When You Open a Website?

When a user types a URL (e.g., www.example.com) into their browser and presses Enter, a series of steps occur behind the scenes before the webpage appears on screen.

### Step 1: URL Entry

The user types `www.example.com` into the browser's address bar and presses Enter. The browser recognises this as a web address and begins the process of fetching the webpage.

### Step 2: DNS Lookup (Domain Name Resolution)

The browser does not understand human-readable domain names directly. It sends a query to a **DNS (Domain Name System)** server, which acts like a phonebook for the internet. The DNS server translates `www.example.com` into a numerical IP address such as `93.184.216.34`.

### Step 3: TCP Connection (Establishing a Channel)

Using the IP address, the browser establishes a reliable connection with the server through the **TCP/IP protocol**. This involves a process called the "three-way handshake" (SYN → SYN-ACK → ACK), which ensures both the client and server are ready to communicate. If the website uses HTTPS, an additional SSL/TLS handshake occurs to encrypt the connection.

### Step 4: Sending the HTTP Request

Once the connection is established, the browser sends an **HTTP GET request** to the server:

```
GET / HTTP/1.1
Host: www.example.com
```

This request essentially says: "Please send me the homepage."

### Step 5: Server Processing

The web server receives the HTTP request and processes it. Depending on the website, the server may:

- Serve a static HTML file directly from disk
- Run backend code (e.g., Node.js) to dynamically generate the page
- Query a database (e.g., MongoDB) to fetch user-specific content

### Step 6: HTTP Response

The server sends back an HTTP response containing:

- A **status code** (e.g., `200 OK` = success, `404` = page not found)
- **Response headers** (content type, caching rules, etc.)
- The **response body**: the HTML document of the requested page

### Step 7: Browser Rendering

The browser receives the HTML file and begins rendering the page in three phases:

1. **HTML Parsing** – The browser reads the HTML and builds the DOM (Document Object Model), which represents the structure of the page.
2. **CSS Styling** – The browser fetches and applies CSS files to style the page (colours, fonts, layouts).
3. **JavaScript Execution** – The browser fetches and runs JavaScript files to add interactivity (animations, click handlers, dynamic content).

Each CSS and JS file may require additional HTTP requests to the server.

### Step 8: Page Displayed

After all resources have been loaded, parsed, and rendered, the fully functional webpage is displayed on the user's screen. The user can now interact with the website — clicking links, filling forms, and navigating to other pages.

---

## Summary

| Step | What Happens |
|------|-------------|
| 1. URL Entry | User types the website address in the browser |
| 2. DNS Lookup | Domain name is translated to an IP address |
| 3. TCP Connection | Browser establishes a reliable connection with the server |
| 4. HTTP Request | Browser sends a GET request asking for the webpage |
| 5. Server Processing | Server processes the request, may query the database |
| 6. HTTP Response | Server sends back HTML, CSS, JS files with a status code |
| 7. Browser Rendering | Browser parses HTML, applies CSS, executes JavaScript |
| 8. Page Displayed | The fully rendered webpage appears on screen |

---

## Key Terms

| Term | Definition |
|------|-----------|
| Client | A device or application (usually a browser) that requests data from a server |
| Server | A remote computer that processes requests and sends back responses |
| Database | A system for storing and retrieving data persistently |
| HTTP | HyperText Transfer Protocol — the standard protocol for web communication |
| DNS | Domain Name System — translates domain names to IP addresses |
| IP Address | A unique numerical address assigned to every device on a network |
| TCP/IP | Transmission Control Protocol / Internet Protocol — ensures reliable data delivery |
| Frontend | The part of a website users see and interact with (HTML, CSS, JS) |
| Backend | The server-side logic that processes requests and manages data |
| DOM | Document Object Model — the browser's internal representation of an HTML page |
