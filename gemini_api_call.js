// gemini_api_call.js
const { OpenAI } = require('openai');

class GeminiAI {
  constructor(apiKey) {
    this.client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY
    });
  }

  /**
   * Generate a response using the AI model
   * @param {string} prompt - The user's input prompt
   * @param {Object} options - Additional options for the API call
   * @returns {Promise<Object>} - The AI response
   */
  async generateResponse(prompt, options = {}) {
    try {
      const defaultOptions = {
        model: "gpt-3.5-turbo", // Using OpenAI as the backend
        temperature: 0.7,
        max_tokens: 500
      };

      const requestOptions = {
        ...defaultOptions,
        ...options,
        messages: [{ role: "user", content: prompt }]
      };

      const completion = await this.client.chat.completions.create(requestOptions);
      
      return {
        success: true,
        text: completion.choices[0].message.content,
        usage: completion.usage,
        model: requestOptions.model
      };
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate an image from text prompt (if using DALL-E capabilities)
   * @param {string} prompt - The description of the image
   * @param {Object} options - Additional options for the image generation
   * @returns {Promise<Object>} - The generated image data
   */
  async generateImage(prompt, options = {}) {
    try {
      const defaultOptions = {
        model: "dall-e-3",
        size: "1024x1024",
        quality: "standard",
        n: 1
      };

      const requestOptions = {
        ...defaultOptions,
        ...options,
        prompt
      };

      const response = await this.client.images.generate(requestOptions);
      
      return {
        success: true,
        imageUrl: response.data[0].url,
        revisedPrompt: response.data[0].revised_prompt
      };
    } catch (error) {
      console.error('Error in image generation:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GeminiAI;