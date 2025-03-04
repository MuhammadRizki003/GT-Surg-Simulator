import $ from "jquery";
import Select2 from 'select2';

class SurgAlert extends HTMLElement {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();

        this._alertData = {
            title: null,
            usedTool: null,
            buttonText: null
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this._initEvents();
    }

    set data(value) {
        this._alertData = value;
        this.render();
        this._initEvents();
    }

    get data() {
        return this._alertData;
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    _initEvents() {
        this.querySelector("#closealert").addEventListener("click", this._closeSetting.bind(this));
    }

    _closeSetting() {
        const alertTab = this;
        alertTab.querySelector('.notif').classList.remove('show');
        setTimeout(() => {
            alertTab.classList.replace('flex', 'hidden');
        }, 500);
    }

    render() {
        this._emptyContent();
        const surgsetClass = ['hidden', 'flex-col', 'w-screen', 'h-screen', 'bg-black/50', 'fixed', 'top-0', 'items-center', 'px-4', 'z-[900]'];
        this.setAttribute('id', 'surgsetting');
        this.classList.add(...surgsetClass);
        this.innerHTML += `
            <div class="flex flex-row mt-40 justify-between pt-6 w-fit notif">
                <div class="flex flex-col justify-center items-center w-full growtopia-theme-box p-4 gap-3">
                <div class="flex flex-row gap-1 justify-start items-end w-full">
                    <img src="./cadu.webp" alt="">
                    <span class="flex items-center text-2xl text-slate-300">
                    Surgery Result
                    </span>
                </div>
                <div class="flex flex-col items-start w-full pl-2">
                    <span id="restitle" class="text-base text-slate-300">
                        ${this.data.title}
                    </span>
                    <span  class="flex items-center text-base text-slate-300">
                    Tools used:
                    </span>
                    <ul id="resused" class="flex flex-col w-full items-center max-h-[288px] overflow-y-auto max-[460px]:text-sm [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#62B3C5] [&::-webkit-scrollbar-thumb]:rounded-[10px]">
                        ${this.data.usedTool}
                    </ul>
                </div>   
                <button id="closealert"
                    class="growtopia-ok-button px-3 py-1 text-xl text-white font-semibold mt-4">${this.data.buttonText}</button>
                </div>
            </div>
        `;
    }

}

customElements.define('surg-alert', SurgAlert);
