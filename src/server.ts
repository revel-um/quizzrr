import app from './app'; // Import the Express app instance

const PORT = process.env.PORT || 3000; // Define the port number; use environment variable or default to 3000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log a message to indicate the server is running
});
