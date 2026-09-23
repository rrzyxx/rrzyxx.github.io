document.addEventListener("DOMContentLoaded", () => {
    const toolbar = document.querySelector(".toolbar");
    const editor = document.querySelector(".editor-textarea");
    const fontSizeSelect = document.querySelector(".toolbar select");

    // 1. Core Format Actions (Bold, Italic, Lists, Alignments, etc.)
    toolbar.addEventListener("click", (e) => {
        // Find the closest button clicked inside the toolbar
        const button = e.target.closest("button");
        if (!button) return;

        // Prevent button from submitting the standard form
        e.preventDefault();

        // Determine the action mapping based on title or helper classes
        const title = button.getAttribute("title");
        let command = "";
        let value = null;

        switch (title) {
            case "Undo": command = "undo"; break;
            case "Redo": command = "redo"; break;
            case "Bold": command = "bold"; break;
            case "Italic": command = "italic"; break;
            case "Underline": command = "underline"; break;
            case "Strikethrough": command = "strikeThrough"; break;
            case "Align Left": command = "justifyLeft"; break;
            case "Align Center": command = "justifyCenter"; break;
            case "Align Right": command = "justifyRight"; break;
            case "Justify": command = "justifyFull"; break;
            case "Bullet List": command = "insertUnorderedList"; break;
            case "Numbered List": command = "insertOrderedList"; break;
            case "Text Color": 
                command = "foreColor"; 
                value = prompt("Enter a color name or hex code (e.g., red, #00ff00):", "#000000");
                if (!value) return;
                break;
            case "Highlight Color": 
                command = "hiliteColor"; 
                value = prompt("Enter a highlight color name or hex code:", "#ffff00");
                if (!value) return;
                break;
        }

        if (command) {
            document.execCommand(command, false, value);
            editor.focus(); // Keep focus active on the editor
        }
    });

    // 2. Font Size Adjustment Handling
    fontSizeSelect.addEventListener("change", (e) => {
        const sizeStr = e.target.value; // e.g., "12 pt"
        let sizeValue = "3"; // Default medium fallback mapping

        // Map CSS-styled typography sizes to standardized HTML exec values (1-7)
        if (sizeStr.includes("12")) sizeValue = "2";
        if (sizeStr.includes("14")) sizeValue = "3";
        if (sizeStr.includes("16")) sizeValue = "4";

        document.execCommand("fontSize", false, sizeValue);
        editor.focus();
    });

    // 3. Focus Recovery Layer
    // Standardizes paragraph breaks using clean <div> or <p> tags rather than layout-breaking <br> lines
    editor.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && document.queryCommandValue("formatBlock") === "") {
            setTimeout(() => {
                document.execCommand("formatBlock", false, "<div>");
            }, 0);
        }
    });
});
