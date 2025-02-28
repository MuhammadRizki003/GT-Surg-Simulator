import $ from "jquery";

class Footer extends HTMLElement {
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
        $(this).addClass('flex flex-col min-h-20 w-full bg-[#1E1F22]/70 items-center justify-center max-[516px]:text-xs max-[390px]:text-[10px]');
        this.innerHTML += `
            <span class="items-center flex flex-row gap-2.5 text-white shadow-2xs text-center">
              Version 1.00 Copyright © GTSurg Simulator 2025. All rights reserved.
            </span>
            <span class="items-center flex flex-row gap-2.5 text-white shadow-2xs text-center">
              All spritesheets used in this simulator are copyright by ubisoft. This planner is in no way affiliated with Ubisoft or Growtopia.
            </span>
        `;
    }

}

customElements.define('foot-tab', Footer);
