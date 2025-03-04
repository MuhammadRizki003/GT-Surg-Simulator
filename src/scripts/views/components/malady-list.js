import $ from "jquery";
import Malady from "../../data/malady";

class MaladyList extends HTMLElement {
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

    _renderMalady(){
        const malady = Malady.getMalady();
        return malady.map(mal => `
            <li class="grid grid-cols-[150px_auto_1fr] max-[750px]:grid-cols-1 gap-3 w-full items-start justify-center">
                <div class="flex flex-row gap-2 w-fit items-center justify-center">
                  <img src="${mal.img}" alt="">
                  <span class="font-bold text-teal-300">${mal.problem}</span>
                </div>
                <div class="max-[750px]:hidden text-purple-400">:</div>
                <div>
                  ${mal.fix}
                </div>
                <div class="w-full bg-amber-50 h-0.5 hidden max-[750px]:block"></div>
            </li>
        `).join('');
    }


    render() {
        this._emptyContent();
        $(this).addClass('w-full');
        this.innerHTML += `
        <ul class="space-y-1 text-white/80 list-disc list-inside flex gap-4 flex-col">
            ${this._renderMalady()}
        </ul>
        `;
    }

}

customElements.define('malady-list', MaladyList);
