
---

# HNG-TEAM-4-DOCKER-APP DEPLOYMENT PROJECT

This project demonstrates a simple web page deployment using Docker and Nginx. The repository contains an HTML file, a CSS file, and a Dockerfile to set up the Nginx server.

## Project Structure

```plaintext
.
├── index.html
├── style.css
└── Dockerfile
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HNG-TEAM-4</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <h1>Welcome to the Deployment Server, where everything works perfectly 👍 well</h1>
</body>
</html>
```

### style.css

```css
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

h1 {
  color: #333;
  text-align: center;
}
```

### Dockerfile

```Dockerfile
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
EXPOSE 80
```

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

- Docker installed on your machine

### Build and Run the Docker Container

1. Clone the repository:
    ```sh
    git clone https://github.com/neyo55/hng-team-4-docker-app.git
    cd hng-team-4-docker-app
    ```

2. Build the Docker image:
    ```sh
    docker build -t hng-team-4-docker-app .
    ```

3. Run the Docker container:
    ```sh
    docker run -d -p 80:80 hng-team-4-docker-app
    ```

4. Open your browser and navigate to `http://localhost` to see the deployed web page.

## Explanation

- **index.html**: This is the main HTML file that displays the welcome message.
- **style.css**: This file contains the styles for the HTML file.
- **Dockerfile**: This file sets up an Nginx server using the Alpine Linux image and copies the HTML and CSS files to the appropriate directory.

## Conclusion

This simple project demonstrates how to use Docker to deploy a static website with Nginx. It can be a starting point for more complex deployments and serves as a practical example of containerizing web applications.

## Further Demonstration

So we are actually using this files to demontrate or we are using github bot to deploy this simple static page on a server and it runs in a container with a random port number attached to the container per pull request.

---

