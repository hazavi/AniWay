function loadSubNavbar() {
    fetch('./navbar/navbar.html') // Adjust this path to where you saved navbar.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Load the navbar when the window loads
window.onload = loadSubNavbar;
