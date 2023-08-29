class KeyBindingManager {
    constructor() {
        this.map = {};
        this.keyBindings = {};

        document.onkeydown = this.onKeyEvent.bind(this);
        document.onkeyup = this.onKeyEvent.bind(this);
    }

    isFormFieldActive() {
        const activeElement = document.activeElement;
        const tagName = activeElement.tagName.toLowerCase();
        return tagName === 'textarea' || (tagName === 'input' && activeElement.type === 'text');
    }

    async onKeyEvent(e) {
        e = e || event;

        if (this.isFormFieldActive()) return;
        this.map[e.key] = e.type === 'keydown';

        if (e.type === 'keydown' && this.map[e.key] && this.keyBindings[e.key]) {
            await this.keyBindings[e.key]();
        }
    }

    manageKeyBindings(key, action, remove = false) {
        if (remove) {
            delete this.keyBindings[key];
        } else {
            this.keyBindings[key] = action;
        }
    }
}

// Usage
//const keyBindingManager = new KeyBindingManager();

// Example key binding
//function myCustomAction() {
//    console.log('Custom action triggered');
//}

//keyBindingManager.manageKeyBindings('a', myCustomAction);

// To remove a key binding
// keyBindingManager.manageKeyBindings('a', null, true);

export default as keyBindingManager;
