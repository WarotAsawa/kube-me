
export function CopyToClipBoard(text) {
    //let newline = String.fromCharCode(13, 10);
    let newText =  text.replace("\n", "\r\n");
    let textField = document.createElement('textarea')
    document.body.appendChild(textField)
    textField.value = newText;
    textField.select()
    document.execCommand('copy')
    textField.remove()
}
