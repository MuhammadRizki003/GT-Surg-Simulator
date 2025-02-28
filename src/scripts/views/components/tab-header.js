import $ from "jquery";

class TabHeader extends HTMLElement {
    constructor() {
        super();
        this._tabInfo = { title: "", subtitle: ""}; // Nilai default
    }

    connectedCallback() {
        this.render();
    }

    set data(value) {
        this._tabInfo = value;
        this.render();
    }

    get data() {
        return this._tabInfo;
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    render() {
        this._emptyContent();
        $(this).addClass('flex w-full justify-center px-4 max-[460px]:px-2');
        this.innerHTML += `
            <div class="growtopia-theme-box w-full max-w-[1400px] p-5 flex flex-col items-center">
              <h1 class="text-4xl font-extrabold text-center text-white drop-shadow-2xl max-[535px]:text-2xl">Growtopia Surgery Guide &
                Simulator</h1>
              <span class="text-slate-100 text-center font-semibold text-md max-[535px]:text-xs">Try unlimited surgeries without spending
                any surgical
                tools!</span>
            </div>
        `;
    }
}

customElements.define('tab-head', TabHeader);
