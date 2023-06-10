
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('translateButton').addEventListener('click', function () {
        // Get the input text
        var inputText = document.getElementById('inputText').value;

        // Perform translation logic here
        // You can use the Hugging Face API or any other translation service

        // Display the translated text
        var translatedText = "Translated:" + translateText(inputText);
        document.getElementById('translatedText').innerHTML = translatedText.value;
    });
});


function translateText(text) {
    const API_TOKEN = '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'; // Replace 'YOUR_API_TOKEN' with your actual Hugging Face API token

    // Function to make the translation request using Hugging Face API
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-jap",
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    // Display loading indicator
    let dots = ".";
    document.getElementById('translatedText').textContent = dots;

    // Make the translation request
    query({ inputs: text }).then((response) => {
        const translatedText = response[0].translation_text;

        // Display the translated text
        document.getElementById('translatedText').textContent = "Translated text: " + translatedText;
    }).catch((error) => {
        console.log('Error:', error);
    });

}