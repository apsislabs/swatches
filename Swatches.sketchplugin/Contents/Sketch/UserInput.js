// ********************************
// # UserInput.js
// # Swatches Plugin
// ********************************
class UserInput {
    static askForUserInputWithTextField(msg, text = "") {
        const textRect   = NSMakeRect(0, 0, 300, 220);
        const scrollView = NSScrollView.alloc().initWithFrame(textRect);
        const textView   = NSTextView.alloc().initWithFrame(textRect);
        const alert      = NSAlert.alloc().init();

        textView.setString(text);

        scrollView.borderType = NSBezelBorder;
        scrollView.setDocumentView(textView);

        alert.setMessageText(msg);
        alert.addButtonWithTitle('OK');
        alert.addButtonWithTitle('Cancel');
        alert.setAccessoryView(scrollView);

        alert.runModal();
        return textView.string();
    }
}