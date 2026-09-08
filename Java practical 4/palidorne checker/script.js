function reverseString(str) {
    return str.split("").reverse().join("");
}

function message() {
    const msg = "Palindrome Checker";
    return () => msg;
}

// Initialize heading
const showMessage = message();
document.getElementById("heading").innerText = showMessage();

function checkPalindrome() {
    const wordInput = document.getElementById("word");
    const resultEl = document.getElementById("result");
    const word = wordInput.value.trim();

    // Reset previous state
    resultEl.className = "result-area";
    resultEl.innerText = "";

    if (!word) {
        showResult("Please enter a word.", "info");
        wordInput.focus();
        return;
    }

    const reversed = reverseString(word);
    const isPalindrome = word.toLowerCase() === reversed.toLowerCase();

    if (isPalindrome) {
        showResult(`"${word}" is a Palindrome!`, "success");
    } else {
        showResult(`"${word}" is Not a Palindrome.`, "error");
    }
}

function showResult(text, type) {
    const resultEl = document.getElementById("result");
    resultEl.innerText = text;
    resultEl.className = `result-area ${type} visible`;
}

// Allow 'Enter' key to trigger check
document.getElementById("word").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPalindrome();
    }
});