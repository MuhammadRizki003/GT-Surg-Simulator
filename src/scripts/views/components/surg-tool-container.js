import $ from "jquery";
import SurgTools from "../../data/surg-tool";

class SurgToolContainer extends HTMLElement {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    render() {
        this._emptyContent();
        $(this).addClass('py-5 flex flex-col justify-center items-center w-full gap-10 px-4 max-[460px]:px-2');
        this.innerHTML += `
            <div class="w-full max-w-[1400px] flex flex-col gap-10 justify-center items-center relative">
              <div id="tool-container" class="grid md:grid-cols-2 gap-[30px] max-[480px]:text-center max-[480px]:gap-2">
              </div>
            </div>
        `;
    }

}

customElements.define('surgtool-con', SurgToolContainer);
