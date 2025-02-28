import $ from "jquery";

class SurgToolItem extends HTMLElement {
    constructor() {
        super();
        this._toolInfo = { img: "", toolname: "", tooldo: "" }; // Nilai default
    }

    connectedCallback() {
        this.render();
    }

    set data(value) {
        this._toolInfo = value;
        this.render(); // Render ulang setelah data di-set
    }

    get data() {
        return this._toolInfo;
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    render() {
        this._emptyContent();
        $(this).addClass('p-8 flex flex-row gap-6 growtopia-theme-box justify-center items-center max-[480px]:flex-col max-[480px]:gap-1');

        this.innerHTML += `
            <img class="min-w-16" src="${this.data.img}" alt="${this.data.toolname}">
            <div class="flex flex-col gap-1 w-full">
                <h2 class="font-semibold text-lg text-slate-50">${this.data.toolname}</h2>
                <p class="text-sm text-slate-200 max-[535px]:text-xs ">${this.data.tooldo}</p>
            </div>
        `;
    }
}

customElements.define('surgtool-item', SurgToolItem);
