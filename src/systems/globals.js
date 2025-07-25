export function typeEffect(element, text, speed) {
    let i = 0;

    function typing() {
        // no typing effect if speed is 0
        if (speed === 0) {
            element.innerHTML = text;
            return;
        }

        if (i < text.length) {
            element.innerHTML = text.substring(0, i+1) + '';
            i++;
            setTimeout(typing, speed);
        } else {
            element.innerHTML = text;
        }
    }

    typing();
}

export function typeAsciiEffect(element, text, speed) {
    const rows = text.split('\n');
    let currentRow = 0;

    function typing() {
        if (speed === 0) {
            element.innerHTML = text;
            return;
        }
        if (currentRow < rows.length) {
            const visibleText = rows.slice(0, currentRow + 1).join('\n');
            element.innerHTML = visibleText + '';
            currentRow++;
            setTimeout(typing, speed);
        } else {
            element.innerHTML = text;
        }
    }

    typing();
}
