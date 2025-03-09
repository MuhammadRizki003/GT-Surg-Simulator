import $ from "jquery";
import Select2 from 'select2';

class SurgSetting extends HTMLElement {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
        this.render();
        this._malady = [
            "Broken Arm",
            "Broken Leg",
            "Bird Flu",
            "Turtle Flu",
            "Monkey Flu",
            "Nose Job",
            "Lung Tumor",
            "Heart Attack",
            "Brain Tumor",
            "Liver Infection",
            "Kidney Failure",
            "Appendicitis",
            "Swallowed World Lock",
            "Herniated Disc",
            "Broken Everything",
            "Serious Head Injury",
            "Serious Trauma",
            "Massive Trauma",
            "Torn Punching Muscle",
            "Gem Cuts",
            "Grumbleteeth",
            "Chicken Feet",
            "Broken Heart",
            "Brainworms",
            "Ecto-Bones",
            "Moldy Guts",
            "Fatty Liver",
            "Chaos Infection",
            "Lupus"
          ]          
    }

    connectedCallback() {
        this.render();
        this._initEvents();
        this._initSelect2();
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    _initEvents() {
        this.querySelector("#closesetting").addEventListener("click", this._closeSetting.bind(this));
        $(document).on('change', 'select#case', function () {
            document.querySelector('surg-sim')?.setAttribute('malady', this.value);
        });
    }

    _initSelect2() {
        
        $("select#case").select2({
            data: this._malady.sort((a, b) => a.localeCompare(b)),
            placeholder: "Select an option",
            allowClear: true
        });
    }
    
    _closeSetting() {
        const settingTab = this;
        settingTab.querySelector('.notif').classList.remove('show');
        setTimeout(() => {
            settingTab.classList.replace('flex', 'hidden');
        }, 500);
    }

    render() {
        this._emptyContent();
        const surgsetClass = ['hidden', 'flex-col', 'w-screen', 'h-screen', 'bg-black/50', 'fixed', 'top-0', 'items-center', 'px-4', 'z-[900]'];
        this.setAttribute('id', 'surgsetting');
        this.classList.add(...surgsetClass);
        this.innerHTML += `
            <div class="flex flex-row mt-40 justify-between pt-6 w-fit notif">
                <div class="flex flex-col justify-center items-center w-full growtopia-theme-box p-4">
                    <p class="flex items-center text-xs text-slate-300">
                        *Form will auto-submit, close when the setup is complete.
                    </p>
                    <div class="flex flex-row justify-between items-center w-full max-[460px]:text-xs">
                        <div class="flex flex-col justify-center ">
                            <span class=" font-semibold text-white pb-1">Select Case: </span>
                            <form>
                                <label for="search" class="mb-2 text-sm font-medium text-white sr-only">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <select id="case"
                                        class="block w-full p-2 ps-10 text-sm growtopia-theme-box focus:outline-0 placeholder:text-slate-300 text-white"
                                        placeholder="Search" required >
                                        <option value="Random">Random</option>
                                    </select>
                                </div>
                            </form>
                            <p class="flex items-center mt-2 text-xs text-slate-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-1.5">
                                    <path fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                        clip-rule="evenodd" />
                                </svg>
                                Default random
                            </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <span class=" font-semibold text-white pb-1">Surgery skill: </span>
                            <div class="relative">
                                <input id="skill" max="100" min="0" type="number" value="100"
                                    class="block w-full p-2 text-sm growtopia-theme-box focus:outline-0 placeholder:text-slate-300 text-white"
                                    placeholder="1-100" />
                                <p class="flex items-center mt-2 text-xs text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-5 h-5 mr-1.5">
                                        <path fill-rule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Default&nbsp;100
                                </p>
                            </div>
                        </div>
                    </div>
                    <button id="closesetting" class="growtopia-ok-button px-3 py-1 self-end text-xl text-white font-semibold mt-4">Close</button>
                </div>
            </div>
        `;
    }

}

customElements.define('surg-set', SurgSetting);
