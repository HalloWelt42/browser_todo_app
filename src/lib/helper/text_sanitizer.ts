function text_sanitizer(content: string, default_text = ''): string {

    let maxLength = 50;

    // Entferne alle Tags aus dem eingegebenen Text
    let plainText = content.replace(/(<([^>]+)>)/ig, "");

    // Entferne alle Zeilenumbrüche aus dem Text
    plainText = plainText.replace(/(\r\n|\n|\r)/gm, "");

    // Entferne alle Sonderzeichen aus dem Text
    // plainText = plainText.replace(/[^\w\s]/gi, '');

    // Entferne alle nicht-alphanumerischen Zeichen außer Umlaute
    plainText = plainText.replace(/[^\w\säöüÄÖÜ\-_!]/gi, '');

    // Überprüfe, ob die Zeichenlänge den Maximalwert überschreitet
    if (plainText.length > maxLength) {
        plainText = plainText.substring(0, maxLength);
    }

    // ggf Whitespaces entfernen
    plainText = plainText.trim();

    if (plainText === '') {
        plainText = default_text; // The contents must not be empty!
    }

    return plainText;
}

export {text_sanitizer}