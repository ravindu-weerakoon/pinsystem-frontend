
// Define modal and closeButton
const modal = document.querySelector('#modal');
const closeButton = modal.querySelector('.modal-close');

// Add click event listener to closeButton
closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});


fetch('http://127.0.0.1:5000/api/pins', {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        headerRow.classList.add('header'); // Add a class to the header row
        const pinidCell = headerRow.insertCell();
        const titleCell = headerRow.insertCell();
        const bodyCell = headerRow.insertCell();
        const userIdCell = headerRow.insertCell();

        pinidCell.innerHTML = 'Pin ID';
        titleCell.innerHTML = 'Title';
        bodyCell.innerHTML = 'Body';
        userIdCell.innerHTML = 'User ID';
        console.log(data);
        data['pins'].forEach(pin => {

            const row = table.insertRow();
            // Adding an event listener to each row
            row.setAttribute('data-pin-id', pin.pin_id);


            const pinidCell = row.insertCell();
            const titleCell = row.insertCell();
            const bodyCell = row.insertCell();
            const userIdCell = row.insertCell();
            pinidCell.innerHTML = pin.pin_id;
            titleCell.innerHTML = pin.title;
            bodyCell.innerHTML = pin.body.slice(0, 50);
            userIdCell.innerHTML = pin.user_id;
        });

        const tableContainer = document.getElementById('table-container');
        tableContainer.appendChild(table);
        // Add event listener to the table to open modal on row click
        table.addEventListener('click', (event) => {
            const row = event.target.closest('tr'); // get the closest row to the clicked element
            if (row) {
                const pinId = row.getAttribute('data-pin-id');
                fetch(`http://127.0.0.1:5000/api/pins/${pinId}`, {
                    method: 'GET',
                })
                    .then(response => response.json())
                    .then(data => {
                        const pin = data['pins'];
                        const modal = document.querySelector('#modal');
                        const modalTitle = modal.querySelector('#modal-title');
                        const modalBody = modal.querySelector('#modal-body');
                        const modalImage = modal.querySelector('#modal-image');
                        const modalUserId = modal.querySelector('#modal-user-id');
                        modalTitle.textContent = pin.title;
                        modalBody.textContent = pin.body;
                        modalImage.src = pin.image_url;
                        modalUserId.textContent = `User ID: ${pin.user_id}`;
                        modal.classList.remove('hidden');
                    })
                    .catch(error => console.error(error));
            }
        });
    })
    .catch(error => console.error(error));
