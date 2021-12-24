console.log("Duplicator.js: loaded");

export class Duplicator{
    constructor() {
        console.log("Duplicator initialized");
    }

    action() {
        const formElement = document.querySelector("#dup-form");

        formElement.addEventListener("submit",(event) => {
            event.preventDefault();
            this.addWow();
        });
    }

    addWow() {
        const wowText = document.querySelector("#jmptxt");
	let childWow = document.createElement("span");
        childWow.className = "rainbow"
        childWow.innerHTML = "wow!";
        wowText.appendChild(childWow);
    }
}
