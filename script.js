// Function to populate the table with saved credentials
function populateTable() {
  const table = document.querySelector('.passwords-section table tbody');
  if (!table) {
    console.error('Table body not found in the DOM.');
    return;
  }
  table.innerHTML = ''; // Clear the table before populating

  const savedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];

  savedCredentials.forEach(({ username, password, website }, index) => {
    const row = document.createElement('tr');
    const usernameCell = document.createElement('td');
    const passwordCell = document.createElement('td');
    const websiteCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    usernameCell.textContent = username;
    passwordCell.textContent = password;
    websiteCell.textContent = website;

    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      savedCredentials.splice(index, 1);
      localStorage.setItem('credentials', JSON.stringify(savedCredentials));
      populateTable(); // Refresh the table
    });

    deleteCell.appendChild(deleteButton);
    row.appendChild(usernameCell);
    row.appendChild(passwordCell);
    row.appendChild(websiteCell);
    row.appendChild(deleteCell);
    table.appendChild(row);
  });
}

// Event listener for the submit button to save data and update the table
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const website = document.querySelector('#website');

  if (username.value && password.value && website.value) {
    const savedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
    savedCredentials.push({ username: username.value, password: password.value, website: website.value });
    localStorage.setItem('credentials', JSON.stringify(savedCredentials));
    console.log('Credentials saved to localStorage');
    populateTable(); // Update the table with the new data
    username.value = ''; // Clear input fields
    password.value = '';
    website.value = '';
  } else {
    console.log('Username, password, or website is empty');
  }
});

// Call the function to populate the table on page load
document.addEventListener('DOMContentLoaded', populateTable);

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});