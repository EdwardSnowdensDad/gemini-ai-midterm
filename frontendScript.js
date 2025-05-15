// frontendScript.js
document.addEventListener('DOMContentLoaded', () => {
    const promptForm = document.getElementById('promptForm');
    const promptInput = document.getElementById('promptInput');
    const responseElement = document.getElementById('response');
    const tokenInfo = document.getElementById('tokenInfo');
    const loadingElement = document.querySelector('.loading');
  
    // Handle form submission
    promptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const prompt = promptInput.value.trim();
      if (!prompt) {
        alert('Please enter a prompt');
        return;
      }
      
      // Show loading indicator
      loadingElement.style.display = 'block';
      responseElement.textContent = '';
      tokenInfo.textContent = '';
      
      try {
        // Send request to our API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Display the response
          responseElement.textContent = data.result;
          
          // Show token usage information if available
          if (data.usage) {
            tokenInfo.textContent = `Tokens used: ${data.usage.total_tokens} (Prompt: ${data.usage.prompt_tokens}, Completion: ${data.usage.completion_tokens})`;
          }
        } else {
          // Handle errors from our API
          responseElement.textContent = `Error: ${data.error || 'Unknown error occurred'}`;
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        responseElement.textContent = `Error: ${error.message || 'Failed to connect to the server'}`;
      } finally {
        // Hide loading indicator
        loadingElement.style.display = 'none';
      }
    });
  
    // Optional: Add a clear button functionality
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.className = 'btn btn-secondary mt-2';
    clearButton.addEventListener('click', () => {
      promptInput.value = '';
      responseElement.textContent = '';
      tokenInfo.textContent = '';
    });
    
    // Insert the clear button after the submit button
    const submitButton = promptForm.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(clearButton, submitButton.nextSibling);
    
    // Add some spacing between buttons
    clearButton.style.marginLeft = '10px';
    submitButton.parentNode.className = 'd-flex gap-2';
  });