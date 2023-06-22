// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the file input element
  var fileInput = document.getElementById("myfile");

  // Add an event listener for when a file is selected
  fileInput.addEventListener("change", function (event) {
    var file = event.target.files[0]; // Get the selected file
    // Create a FileReader to read the file
    var reader = new FileReader();

    // When the file is loaded, calculate the hash value
    reader.onload = function (event) {
      var fileData = event.target.result; // Get the file data
      calculateHash(fileData);
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });

  // Function to calculate the hash value of the file
  function calculateHash(fileData) {
    // Convert the ArrayBuffer to a Uint8Array
    var dataView = new Uint8Array(fileData);

    // Use the SubtleCrypto API to calculate the hash
    crypto.subtle
      .digest("SHA-256", dataView)
      .then(function (hash) {
        // Convert the hash ArrayBuffer to a hexadecimal string
        var hashArray = Array.from(new Uint8Array(hash));
        var hashHex = hashArray
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

        // Display the hash value in the search input field
        var searchInput = document.getElementById("mysearch");
        searchInput.value = hashHex;
      })
      .catch(function (error) {
        console.error("Error calculating hash:", error);
      });
  }
});
