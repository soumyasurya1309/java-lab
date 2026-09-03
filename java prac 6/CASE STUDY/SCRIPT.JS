document.addEventListener('DOMContentLoaded', () => {
    // Reverse String Logic
    const reverseBtn = document.getElementById('reverse-btn');
    const stringInput = document.getElementById('string-input');
    const reverseResult = document.getElementById('reverse-result');

    reverseBtn.addEventListener('click', () => {
        const text = stringInput.value;
        if (!text.trim()) {
            showResult(reverseResult, 'Please enter a string.', false);
            return;
        }
        
        const reversedText = text.split('').reverse().join('');
        showResult(reverseResult, reversedText, true);
    });

    // Count Vowels Logic
    const vowelBtn = document.getElementById('vowel-btn');
    const paragraphInput = document.getElementById('paragraph-input');
    const vowelResult = document.getElementById('vowel-result');

    vowelBtn.addEventListener('click', () => {
        const text = paragraphInput.value;
        if (!text.trim()) {
            showResult(vowelResult, 'Please enter a paragraph.', false);
            return;
        }

        const vowelMatch = text.match(/[aeiouAEIOU]/g);
        const vowelCount = vowelMatch ? vowelMatch.length : 0;
        
        showResult(vowelResult, `Total Vowels: ${vowelCount}`, true);
    });

    // Helper to display results with styling
    function showResult(element, text, isSuccess) {
        element.innerHTML = `<span class="result-text" style="color: ${isSuccess ? '#10b981' : '#ef4444'}">${text}</span>`;
        element.classList.add('has-content');
    }
});
