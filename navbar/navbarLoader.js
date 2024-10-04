function loadSubNavbar() {
    fetch('./navbar/navbar.html') // Adjust this path to where you saved navbar.html
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            initResponsiveNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function initResponsiveNavbar() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close mobile menu and dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
            navLinks.classList.remove('show');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}

// Load the navbar when the window loads
window.onload = loadSubNavbar;