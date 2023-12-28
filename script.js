// Function to handle the form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get the pincode input value from the form
    const pincode = document.getElementById('pincode').value;

    // Check if the pincode is not empty
    if (pincode.trim() === '') {
        alert('Please enter a valid pincode');
        return;
    }

    // Fetch data from the API using the provided pincode
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
    fetch(apiUrl)
        .then(response => {
            // Check if the response status is OK (200) before proceeding
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // Handle the data returned from the API
            displayData(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
}

// Function to display the fetched data
function displayData(data) {
    const resultDiv = document.getElementById('result');
    // Clear any previous results
    resultDiv.innerHTML = '';

    // Check if the API returned valid data
    if (data && Array.isArray(data) && data.length > 0) {
        // The API returns data in an array, but it usually contains a single object in this case
        const pincodeData = data[0];

        // Check if the pincode is found in the API
        if (pincodeData.Status === 'Success') {
            const dataDetails = pincodeData.PostOffice;
            // Display the data in the resultDiv
            resultDiv.innerHTML = `
          <h2>Pincode Details for ${dataDetails[0].Pincode}</h2>
          <p>State: ${dataDetails[0].State}</p>
          <p>City: ${dataDetails[0].District}</p>
          <p>Post Office: ${dataDetails[0].Name}</p>
        `;
        } else {
            resultDiv.textContent = 'Pincode not found';
        }
    } else {
        resultDiv.textContent = 'Invalid response from the API';
    }
}

// Add an event listener to the form to handle the submission
document.getElementById('pincodeForm').addEventListener('submit', handleSubmit);