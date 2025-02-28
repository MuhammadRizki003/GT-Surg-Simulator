import $ from "jquery";
class SurgSimulator extends HTMLElement {
    // eslint-disable-next-line no-useless-constructor
    static observedAttributes = ['skill', 'malady'];
    constructor() {
        super();
        this._skill = 100;
        this._toolIcon = {
            spongUsed: { img: './surgical_sponge.webp', text: 'Surgical Sponge' },
            scalpUsed: { img: './surgical_scalpel.webp', text: 'Surgical Scalpel' },
            stitcUsed: { img: './surgical_stitches.webp', text: 'Surgical Stitches' },
            antibUsed: { img: './surgical_antibiotics.webp', text: 'Surgical Antibiotics' },
            antisUsed: { img: './surgical_antiseptic.webp', text: 'Surgical Antiseptic' },
            ultraUsed: { img: './surgical_ultrasound.webp', text: 'Surgical Ultrasound' },
            labkiUsed: { img: './surgical_labkit.webp', text: 'Surgical Lab Kit' },
            anestUsed: { img: './surgical_anesthetic.webp', text: 'Surgical Anesthetic' },
            defibUsed: { img: './surgical_defibrilator.webp', text: 'Surgical Defibrillator' },
            splinUsed: { img: './surgical_splint.webp', text: 'Surgical Splint' },
            pinsUsed: { img: './surgical_pins.webp', text: 'Surgical Pins' },
            clampUsed: { img: './surgical_clamp.webp', text: 'Surgical Clamp' },
            transUsed: { img: './surgical_transfusion.webp', text: 'Surgical Transfusion' }
        };
        this._surgData = {
            currentSkill: true,
            skillFail: 0,
            sounded: false,
            labworked: false,
            fixed: false,
            fixable: false,
            flu: false,
            pulse: 40,
            site: 0,
            sleep: 0,
            dirt: 0,
            broken: 0,
            shattered: 0,
            incisions: 0,
            bleeding: 0,
            incneeded: 0,
            heart: 0,
            temp: 98.6,
            fever: 0.0,
            pretext: '',
            fixtext: '',
            postext: '',
            scantext: '',
            tooltext: 'The patient is prepped for surgery.',
            endtext: '',
            failchance: 0,
            antibs: false,
            bans: 0,
            selfbans: 0,
            spongUsed: 0,
            scalpUsed: 0,
            stitcUsed: 0,
            antibUsed: 0,
            antisUsed: 0,
            ultraUsed: 0,
            labkiUsed: 0,
            anestUsed: 0,
            defibUsed: 0,
            splinUsed: 0,
            pinsUsed: 0,
            clampUsed: 0,
            transUsed: 0
        }

    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;
        console.log(`Nilai ${name} dah diatur jadi ${newValue}`);
        if (name === 'malady') {
            this._custom(newValue);
        }
    }

    connectedCallback() {
        this.render();
        this.run();
    }

    _emptyContent() {
        this.innerHTML = '';
    }

    set surgData(value) {
        this._surgData = value;
    }

    get surgData() {
        return this._surgData;
    }

    get toolIcon() {
        return this._toolIcon;
    }

    get skill() {
        return this._skill;
    }

    _updateSurgData(key, value) {
        if (key in this._surgData) {
            this._surgData[key] = value;
        }
    }
    _usetool(tool) {
        this._setSkill();
        let skill = this.currentSkill;
        if (this._toolavailable(tool)) {
            switch (tool) {
                case 'sponge':
                    this._surgData.spongUsed += 1;
                    if (skill) {
                        this._surgData.dirt = 0;
                        this._surgData.tooltext = 'You mopped up the operating site.';
                    } else {
                        this._surgData.tooltext = 'You somehow managed to eat the sponge.';
                    }
                    break;

                case 'scalpel':
                    this._surgData.scalpUsed += 1;
                    if (this._surgData.sleep == 0) {
                        this._surgData.endtext = 'You have cut the awake patient!';
                    }
                    if (this._surgData.incisions == this._surgData.incneeded && this._surgData.shattered == 0) {
                        this._surgData.tooltext = 'You stabbed the patient in a vital organ!';
                        this._surgData.bleeding += 1;
                        skill = true;
                    } else {
                        this._surgData.incisions += 1;
                        this._surgData.tooltext = skill
                            ? 'You\'ve made a neat incision.'
                            : 'This will leave a nasty scar, but you managed to cut the right place.';
                    }
                    break;

                case 'stitches':
                    this._surgData.stitcUsed += 1;
                    if (skill) {
                        if (this._surgData.incisions > 0) {
                            this._surgData.tooltext = 'You stitched up an incision.';
                            this._surgData.incisions -= 1;
                        } else if (this._surgData.bleeding > 0) {
                            this._surgData.tooltext = 'You bandaged some injuries.';
                            this._surgData.bleeding -= 1;
                        } else {
                            this._surgData.tooltext = 'You tried to stitch your patient\'s mouth shut!.';
                        }
                    } else {
                        this._surgData.tooltext = 'You somehow tied yourself up in stitches!';
                    }
                    break;

                case 'antiseptic':
                    this._surgData.antisUsed += 1;
                    if (skill) {
                        this._surgData.site = Math.min(this._surgData.site + 20, 20);
                        this._surgData.tooltext = 'You disinfected the operating site.';
                    } else {
                        this._surgData.tooltext = 'You spilled antiseptic on your shoes. They are very clean now.';
                    }
                    break;
                case 'antibiotics':
                    this._surgData.antibUsed += 1;
                    if (skill) {
                        this._surgData.fever -= 3;
                        this._surgData.tooltext = 'You used antibiotics to reduce the patient\'s infection.';
                        if (this._surgData.fever > -3)
                            this._surgData.antibs = true;
                    } else {
                        this._surgData.fever += 1;
                        this._surgData.tooltext = 'This is the wrong medication! The bacteria like it.';
                    }
                    break;
                case 'splint':
                    this._surgData.splinUsed += 1;
                    if (skill) {
                        this._surgData.broken -= 1;
                        this._surgData.tooltext = 'You splinted a broken bone.';
                    } else
                        this._surgData.tooltext = 'You ate a splint, good job!';
                    break;
                case 'anesthetic':
                    this._surgData.anestUsed += 1;
                    if (skill) {
                        this._surgData.sleep += 10;
                        this._surgData.tooltext = 'The patient falls into a deep sleep.';
                    } else
                        this._surgData.tooltext = 'You end up inhaling all the anesthetic yourself. You feel woozy.';
                    break;
                case 'labkit':
                    this._surgData.labkiUsed += 1;
                    if (skill) {
                        this._surgData.labworked = true;
                        if (this._surgData.flu)
                            this._surgData.tooltext = 'You performed lab work on the patient, and discovered they are suffering from ' + this.surgData.scantext;
                        else
                            this._surgData.tooltext = 'You performed lab work on the patient, and have antibiotics at the ready.';
                    } else
                        this._surgData.tooltext = 'You contaminated the sample.';
                    break;
                case 'ultrasound':
                    this._surgData.ultraUsed += 1;
                    if (skill) {
                        this._surgData.sounded = true;
                        if (this._surgData.flu)
                            this._surgData.tooltext = 'You scanned the patient , but didn\'t find any abnormal masses.'
                        else
                            this._surgData.tooltext = 'You scanned the patient with ultrasound, discovering they are suffering from ' + this.surgData.scantext;
                    } else
                        this._surgData.tooltext = 'You scanned the nurse with your ultrasound!';
                    break;
                case 'pins':
                    this._surgData.pinsUsed += 1;
                    if (skill) {
                        this._surgData.shattered -= 1;
                        this._surgData.broken += 1;
                        this._surgData.tooltext = 'You pinned a shattered bone together. Don\'t forget to splint it!';
                    } else {
                        this._surgData.bleeding += 1;
                        this._surgData.tooltext = 'You jabbed the pin through the artery!';
                    }
                    break;

                case 'defibrillator':
                    this._surgData.defibUsed += 1;
                    if (skill) {
                        this._surgData.heart = 0;
                        this._surgData.tooltext = 'You shocked the patient back to life!';
                    } else {
                        this._surgData.tooltext = 'You electrocuted yourself!';
                    }
                    break;

                case 'transfusion':
                    this._surgData.transUsed += 1;
                    if (skill) {
                        this._surgData.pulse = Math.min(this._surgData.pulse + 15, 40);
                        this._surgData.tooltext = 'You transfused several pints of blood into your patient.';
                    } else
                        this._surgData.tooltext = 'You spilled all of it! Kind of gross.';
                    break;
                case 'clamp':
                    this._surgData.clampUsed += 1;
                    if (skill) {
                        this._surgData.bleeding -= 1;
                        this._surgData.tooltext = 'You clamped up some blood vessels.';
                    } else
                        this._surgData.tooltext = 'The clamp fell out of your hand, oh well.';
                    break;

                case 'fixit':
                    if (skill) {
                        this._surgData.fixed = true;
                        this._surgData.tooltext = this._surgData.postext;
                    } else {
                        this._surgData.tooltext = 'You screwed it up! Try again.';
                    }
                    break;
            }
            // Making Glove available
            if (!this._surgData.fixable && (this._surgData.incisions == this._surgData.incneeded) && this._surgData.sounded) {
                this._surgData.fixable = true;
                this._surgData.tooltext += '<br />' + this._surgData.fixtext;
            }
            // Update status pasien berdasarkan perubahan di surgData
            this._surgData.dirt += this._surgData.bleeding + this._surgData.incisions;
            this._surgData.dirt = Math.min(this._surgData.dirt, 10);
            this._surgData.site -= Math.floor(this._surgData.dirt / 3);
            this._surgData.site = Math.max(this._surgData.site, -25);

            if (this._surgData.sleep == 0 && this._surgData.incisions > 0) {
                this._surgData.bleeding += 1;
            }
            this._surgData.bleeding = Math.min(this._surgData.bleeding, 4);

            if (this._surgData.fever < 0) {
                if (this._surgData.fever > -0.06) {
                    this._surgData.fever = 0;
                } else if (!this._surgData.antibs) {
                    this._surgData.fever = (this._surgData.fever - 3) / 2;
                }
            } else if ((this._surgData.site <= 2 && this._surgData.bleeding > 0) || (this._surgData.site <= 4 && this._surgData.incisions > 0)) {
                this._surgData.fever += 0.06;
            }
            this._surgData.temp += this._surgData.fever;
            this._surgData.temp = Math.round(this._surgData.temp * 100) / 100;
            this._surgData.temp = Math.max(this._surgData.temp, 98.6);
            this._surgData.antibs = false;

            if ((this._surgData.sleep > 0 && Math.random() < 0.2) || (this._surgData.heart > 0)) {
                this._surgData.heart += 1;
            } else {
                this._surgData.sleep = Math.max(this._surgData.sleep - 1, 0);
            }

            this._surgData.pulse -= this._surgData.bleeding + Math.min(this._surgData.incisions, 1);

            if (this._surgData.pulse < 1 && this._surgData.endtext.length == 0) {
                this._surgData.endtext = 'Your patient bled out!';
            } else if (this._surgData.temp >= 111) {
                this._surgData.endtext = 'Your patient succumbed to infection!';
            } else if (this._surgData.heart == 3) {
                this._surgData.endtext = 'You failed to resuscitate your patient in time!';
            } else if (this._surgData.sleep > 15) {
                this._surgData.endtext = 'You put your patient to sleep. Permanently!';
            } else if (this._surgData.incisions == 0 && this._surgData.broken == 0 && this._surgData.shattered == 0 && this._surgData.fixed && this._surgData.bleeding == 0 && this._surgData.temp < 101) {
                this._surgData.endtext = 'success';
            }

            if (this._surgData.endtext !== '') {
                let usedtext = '';

                // Object.keys(this._surgData).forEach(key => {
                //     if (key.endsWith('Used') && this._surgData[key] > 0) {
                //         usedtext += `<li><img src="${this.toolIcon[key]}" alt="">${key.replace('Used', '')}: ${this._surgData[key]}<br></li>`;
                //     }
                // });
                Object.keys(this._surgData).forEach(key => {
                    if (key.endsWith('Used') && this._surgData[key] > 0) {
                        usedtext += `<li class="w-full flex flex-row gap-1 items-center">
                                        <img src="${this.toolIcon[key].img}" alt="">
                                        <span class="text-base text-slate-300">×${this._surgData[key]} ${this.toolIcon[key].text}</span>
                                     </li>`;
                    }
                });

                const alerttab = $('surg-alert').get(0);
                console.log(this.surgData);

                alerttab.data = {
                    title: this._surgData.endtext === 'success'
                        ? `You&nbsp;<span class="text-[#2ED413]"> saved</span>&nbsp; your patient! You get: ${this._prizetext()}!`
                        : `${this._surgData.endtext}`,
                    usedTool: usedtext,
                    buttonText: this._surgData.endtext === 'success' ? 'Horaay!' : 'Try again!'
                }
                $(alerttab).removeClass('hidden').addClass('flex');
                setTimeout(() => {
                    $(alerttab).find('.notif').addClass('show');
                }, 50);
                this._setstats(Math.floor(Math.random() * 18));
            }
            this._draw();
        }
    }

    render() {
        this._emptyContent();
        $(this).attr('skill', 100);
        $(this).addClass('flex w-full justify-center px-4 max-[460px]:px-2');
        this.innerHTML += `
            <div class="growtopia-theme-box w-full max-w-[1400px] p-5 flex flex-col relative">
              <span class="text-[#fad785] text-lg font-bold">
                <div class="flex flex-row justify-between max-[600px]:flex-col mb-2">
                  <div class="flex flex-row justify-start items-end gap-2 mb-2">
                    <img src="./surg-e.webp" alt="surg-e" class="w-10 h-10 max-[460px]:w-7 max-[460px]:h-7">
                    <span class="text-2xl max-[460px]:text-lg  font-semibold text-[#F3C678]">Surg-E Anatomical Dummy</span>
                  </div>
                  <button id="opensetting"
                    class="growtopia-button flex flex-row gap-1 px-2 h-11 max-[460px]:h-8 justify-center items-center text-white font-semibold text-lg  max-[600px]:w-fit  max-[600px]:self-end">
                    <span class="text-white text-2xl max-[460px]:text-lg">Setting</span>
                    <img class="w-8 h-8 max-[460px]:w-6 max-[460px]:h-6 animate-[wiggle_3s_ease-in-out_infinite]" src="./wrench.webp" alt="">
                  </button>
                </div>
                <div id="date-ver" class="text-xl font-semibold text-white max-[460px]:text-sm"></div>
                <div id="surstat" class="max-[460px]:text-sm">
                </div>
              </span>
              <div id="surgact" class="hidden grid-cols-[repeat(7,minmax(auto,auto))] w-fit gap-1 max-[460px]:gap-0 max-[350px]:grid-cols-[repeat(auto-fit,minmax(52px,1fr))] max-[350px]:w-auto">
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="sponge" title="Surgical Sponge." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="scalpel" title="Surgical Scalpel." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="stitches" title="Surgical Stitches." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="antibiotics" title="Surgical Antibiotics." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="antiseptic" title="Surgical Antiseptic." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="fixit" title="Surgical Glove." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="ultrasound" title="Surgical Ultrasound." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="labkit" title="Surgical Lab Kit." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="anesthetic" title="Surgical Anesthetic." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="defibrillator" title="Surgical Defibrillator." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="splint" title="Surgical Splint." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="pins" title="Surgical Pins." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="clamp" title="Surgical Clamp." />
                <img class="w-16 h-14 max-[460px]:w-13 max-[460px]:h-13 cursor-pointer toolbutton" id="transfusion" title="Surgical Transfusion." />
             </div>


              <!-- <div class="flex flex-wrap gap-2 mt-4">

              </div>

              <div class="flex flex-wrap gap-2 mt-4">

              </div> -->
            </div>
        `;
    }
    _toolavailable(tool) {
        const { sounded, labworked, fixable, fixed, heart, broken, shattered, incisions, bleeding, dirt } = this.surgData;
        if (dirt == 10 && tool != 'sponge' && tool != 'ban' && tool != '')
            return false;

        switch (tool) {
            case 'sponge':
                return true;
            case 'antibiotics':
                return labworked;
            case 'fixit':
                return fixable && !fixed;
            case 'ultrasound':
                return !sounded;
            case 'labkit':
                return !labworked;
            case 'defibrillator':
                return heart > 0;
            case 'splint':
                return broken > 0;
            case 'pins':
                return shattered > 0 && incisions > 0;
            case 'clamp':
                return incisions > 0 && bleeding > 0;
            default:
                return true;
        }
    }

    _draw() {
        let drawbox = document.getElementById("surstat");
        drawbox.innerHTML = '';
        const { sounded, flu, labworked, fixable, incneeded, fixed, pretext, fixtext, postext, pulse, heart, sleep, temp, site, dirt, incisions, broken, shattered, bleeding, fever, tooltext } = this.surgData;
        if (!sounded && !flu || !labworked && flu)
            drawbox.innerHTML += `<span class="text-[#F44849] font-semibold">The patient has not been diagnosed.</span>`
        else if (!fixable || flu || incneeded == 0)
            drawbox.innerHTML += (pretext)
        else if (!fixed)
            drawbox.innerHTML += (fixtext)
        else
            drawbox.innerHTML += (postext);
        // Separator
        drawbox.innerHTML += '<br>';
        // container
        const surginfo = document.createElement('div');
        const surginfoclasses = ['grid', 'grid-cols-[min-content_auto]', 'w-fit', 'gap-x-4', 'gap-y-1', 'max-[460px]:text-sm']
        surginfo.classList.add(...surginfoclasses);
        // Pulse
        if (pulse < 11) {
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white text-base font-semibold">Pulse&nbsp;: </span>
    <span class="text-[#F44849] text-base font-semibold">Extremely Weak</span>
</div>`;
        } else if (pulse < 21) {
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Pulse&nbsp;: </span>
    <span class="text-[#F3C678] font-semibold">Weak</span>
</div>`;
        } else if (pulse < 31) {
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Pulse&nbsp;: </span>
    <span class="text-[#7EBDE1] font-semibold">Steady</span>
</div>`;
        } else {
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Pulse&nbsp;: </span>
    <span class="text-[#2ED413] font-semibold">Strong</span>
</div>`;
        }

        // Status
        if (heart > 0)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Status&nbsp;: </span>
    <span class="text-[#F44849] font-semibold">Heart stopped!</span>
</div>`;
        else if (sleep == 0)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
<span class="text-white font-semibold">Status&nbsp;: </span>
<span class="${fixed ? 'text-[#7EBDE1]' : 'text-[#F44849]'} font-semibold">Awake</span>
</div>`;
        else if (sleep < 3)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Status&nbsp;: </span>
    <span class="text-[#F3C678] font-semibold">Coming to</span>
</div>`
        else
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Status&nbsp;: </span>
    <span class="text-[#2ED413] font-semibold">Unconcsious</span>
</div>`;
        // Temp
        if (temp < 100)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Temp&nbsp;: </span>
    <span class="text-[#2ED413] font-semibold">${temp}</span>
</div>`;
        else if (temp < 104)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Temp&nbsp;: </span>
    <span class="text-[#7EBDE1] font-semibold">${temp}</span>
</div>`;
        else if (temp < 106)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Temp&nbsp;: </span>
    <span class="text-[#F3C678] font-semibold">${temp}</span>
</div>`;
        else
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Temp&nbsp;: </span>
    <span class="text-[#F44849] font-semibold">${temp}</span>
</div>`;
        // Operation site
        if (site < -3)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Operation site&nbsp;: </span>
    <span class="text-[#F44849] font-semibold">Unsanitary</span>
</div>`;
        else if (site < -1)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Operation site&nbsp;: </span>
    <span class="text-[#F3C678] font-semibold">Unclean</span>
</div>`;
        else if (site < 1)
            surginfo.innerHTML += `<div class="flex flex-row  gap-0.5 w-auto">
    <span class="text-white font-semibold">Operation site&nbsp;: </span>
    <span class="text-[#7EBDE1] font-semibold">Not sanitized</span>
</div>`;
        else surginfo.innerHTML += `<div class="flex flex-row  gap-0.5 w-auto">
    <span class="text-white font-semibold">Operation site&nbsp;: </span>
    <span class="text-[#2ED413] font-semibold">Clean</span>
</div>`;
        // Dirt
        if (dirt == 10)
            surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-[#F44849] font-semibold">You can\'t see what you are doing!</span>
          </div>`;
        else if (dirt > 4)
            surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-[#F3C678] font-semibold">It is becoming hard to see your work.</span>
          </div>`;
        // Incisions
        if (incisions == 0)
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Incisions&nbsp;: </span>
    <span class="text-[#2ED413] font-semibold">${incisions}</span>
</div>`;
        else
            surginfo.innerHTML += `<div class="flex flex-row gap-0.5 w-auto">
    <span class="text-white font-semibold">Incisions&nbsp;: </span>
    <span class="text-[#7EBDE1] font-semibold">${incisions}</span>
</div>`
        // Bones
        if (broken + shattered > 0 && sounded) {
            const bonescontainer = document.createElement('div');
            const bonescontainerclasses = ['flex', 'flex-row', 'gap-0.5'];
            bonescontainer.classList.add(...bonescontainerclasses);
            bonescontainer.innerHTML += `
            <span class="text-white font-semibold">Bones&nbsp;: </span>`;
            let brokenText = "";
            let shatteredText = "";

            // Proses broken
            if (broken > 0) {
                if (broken > 2) {
                    brokenText = `<span class="text-[#F44849] font-semibold">${broken} broken</span>`;
                } else {
                    brokenText = `<span class="text-[#F3C678] font-semibold">${broken} broken</span>`;
                }
            }

            // Proses shattered
            if (shattered > 0) {
                if (shattered > 2) {
                    shatteredText = `<span class="text-[#F44849] font-semibold">${shattered} shattered</span>`;
                } else {
                    shatteredText = `<span class="text-[#F3C678] font-semibold">${shattered} shattered</span>`;
                }
            }

            // Gabungkan hasilnya
            if (brokenText || shatteredText) {
                bonescontainer.innerHTML += `<span class="text-white font-semibold">${brokenText}${brokenText && shatteredText ? ', ' : ''}${shatteredText}</span></div>`;
                surginfo.append(bonescontainer);
            }

        }
        // Bleeding
        if (bleeding > 0) {
            if (bleeding == 1)
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient is losing blood <span class="text-[#7EBDE1] font-semibold">slowly</span></span>
          </div>`;
            else if (bleeding == 4)
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient is losing blood <span class="text-[#F44849] font-semibold">fast!</span></span>
          </div>`;
            else {
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient is <span class="text-[#F3C678] font-semibold">losing blood!</span></span>
          </div>`;
            }
        }
        // Fever
        if (fever > 0 && temp > 100) {
            if (fever < 0.5)
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient\'s fever is <span class="text-[#7EBDE1] font-semibold">slowly rising</span></span>
          </div>`;
            else if (fever > 2)
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient\'s fever is <span class="text-[#F44849] font-semibold">climbing fast!</span></span>
          </div>`;
            else {
                surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-white font-semibold">Patient\'s fever is <span class="text-[#F3C678] font-semibold">climbing!</span></span>
          </div>`;
            }
        }
        // Special: heart stop and cut awake
        if (heart == 1)
            surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-[#F44849] font-semibold">The patient\'s heart has stopped!</span>
          </div>`;
        else if (incisions > 0 && sleep == 0)
            surginfo.innerHTML += `<div class="col-span-2">
            <span class="text-[#F44849] font-semibold">The patient screams and flails!</span>
          </div>`;

        // container end
        drawbox.appendChild(surginfo);
        // Tool text
        if (this.currentSkill)
            drawbox.innerHTML += `<div class="col-span-2 mt-10">
            <span class="text-[#7EBDE1] font-semibold">${tooltext}</span>
          </div>`;
        else
            drawbox.innerHTML += `<div class="col-span-2 mt-10">
            <span class="text-[#F44849] font-semibold">[Skill Fail (${this.skillFail})%)] </span> 
            <span class="text-[#F3C678] font-semibold">${tooltext}</span> 
          </div>`;
        // Availability
        if (this._toolavailable('scalpel'))
            document.getElementById('scalpel').src = './surgical_scalpel.webp'
        else
            document.getElementById('scalpel').src = './empty_surgery.webp';

        if (this._toolavailable('stitches'))
            document.getElementById('stitches').src = './surgical_stitches.webp'
        else
            document.getElementById('stitches').src = './empty_surgery.webp';

        if (this._toolavailable('anesthetic'))
            document.getElementById('anesthetic').src = './surgical_anesthetic.webp'
        else
            document.getElementById('anesthetic').src = './empty_surgery.webp';

        if (this._toolavailable('antibiotics'))
            document.getElementById('antibiotics').src = './surgical_antibiotics.webp'
        else
            document.getElementById('antibiotics').src = './empty_surgery.webp';
        if (this._toolavailable('antiseptic'))
            document.getElementById('antiseptic').src = './surgical_antiseptic.webp'
        else
            document.getElementById('antiseptic').src = './empty_surgery.webp';

        if (this._toolavailable('clamp'))
            document.getElementById('clamp').src = './surgical_clamp.webp'
        else
            document.getElementById('clamp').src = './empty_surgery.webp';

        if (this._toolavailable('defibrillator'))
            document.getElementById('defibrillator').src = './surgical_defibrilator.webp'
        else
            document.getElementById('defibrillator').src = './empty_surgery.webp';

        if (this._toolavailable('labkit'))
            document.getElementById('labkit').src = './surgical_labkit.webp'
        else
            document.getElementById('labkit').src = './empty_surgery.webp';

        if (this._toolavailable('pins'))
            document.getElementById('pins').src = './surgical_pins.webp'
        else
            document.getElementById('pins').src = './empty_surgery.webp';

        if (this._toolavailable('splint'))
            document.getElementById('splint').src = './surgical_splint.webp'
        else
            document.getElementById('splint').src = './empty_surgery.webp';
        if (this._toolavailable('sponge'))
            document.getElementById('sponge').src = './surgical_sponge.webp'
        else
            document.getElementById('sponge').src = './empty_surgery.webp';

        if (this._toolavailable('transfusion'))
            document.getElementById('transfusion').src = './surgical_transfusion.webp'
        else
            document.getElementById('transfusion').src = './empty_surgery.webp';

        if (this._toolavailable('ultrasound'))
            document.getElementById('ultrasound').src = './surgical_ultrasound.webp'
        else
            document.getElementById('ultrasound').src = './empty_surgery.webp';

        if (this._toolavailable('fixit'))
            document.getElementById('fixit').src = './surgical_gloves.webp'
        else
            document.getElementById('fixit').src = './empty_surgery.webp';
        $('#surgact').removeClass('hidden').addClass('grid');
    }
    _setstats(i) {
        const data = {
            currentSkill: true,
            skillFail: 0,
            sounded: false,
            labworked: false,
            fixed: false,
            fixable: false,
            flu: false,
            pulse: 40,
            site: 0,
            sleep: 0,
            dirt: 0,
            broken: 0,
            shattered: 0,
            incisions: 0,
            bleeding: 0,
            incneeded: 0,
            heart: 0,
            temp: 98.6,
            fever: 0,
            pretext: '',
            fixtext: '',
            postext: '',
            scantext: '',
            tooltext: 'Patient is prepped for surgery.',
            endtext: '',
            bans: 0,
            selfbans: 0,
            spongUsed: 0,
            scalpUsed: 0,
            stitcUsed: 0,
            antibUsed: 0,
            antisUsed: 0,
            ultraUsed: 0,
            labkiUsed: 0,
            anestUsed: 0,
            defibUsed: 0,
            splinUsed: 0,
            pinsUsed: 0,
            clampUsed: 0,
            transUsed: 0
        };

        switch (i) {
            case 0:

                data.fixed = true;
                data.bleeding = 1;
                data.broken = 1;
                data.pretext = 'Patient broke his arm.';
                data.scantext = 'a broken arm! You found 1 broken bone.'
                break;
            case 1:

                data.fixed = true;
                data.bleeding = 1;
                data.broken = 1;
                data.shattered = 1;
                data.pretext = 'Patient broke his leg.';
                data.scantext = 'a broken leg! You found 1 broken bone and 1 shattered bone.';

                break;
            case 2:

                data.fixed = true;
                data.flu = true;
                data.temp = 104.6;
                data.fever = 2.5;
                data.dirt = 6;
                data.pretext = 'Patient is showing signs of the bird flu.';
                data.scantext = 'bird flu!';

                break;
            case 3:

                data.fixed = true;
                data.flu = true;
                data.temp = 101.6;
                data.fever = 3.6;
                data.dirt = 6;
                data.pretext = 'Patient is showing signs of the turtle flu.';
                data.scantext = 'turtle flu!';

                break;
            case 4:
                data.fixed = true;
                data.flu = true;
                data.temp = 107.6;
                data.fever = 2.4;
                data.pretext = 'Patient is showing signs of the monkey flu.';
                data.scantext = 'monkey flu!';
                break;
            case 5:
                data.sounded = true;
                data.incneeded = 1;
                data.pretext = 'Patient wants a nose job.';
                data.fixtext = 'You have cut into nasal area.';
                data.postext = 'You rearranged their face!';

                break;
            case 6:
                data.incneeded = 1;
                data.scantext = 'a lung tumor!';
                data.pretext = 'Patient has a tumor in their lung.';
                data.fixtext = 'The lungs are now exposed.';
                data.postext = 'You excised the tumor!';

                break;
            case 7:
                data.incneeded = 2;
                data.scantext = 'a heart attack!';
                data.pretext = 'Patient had a heart attack.';
                data.fixtext = 'The heart is now exposed for operating.';
                data.postext = 'You grafted in some nice new arteries!';
                break;
            case 8:
                data.incneeded = 5;
                data.scantext = 'a brain tumor!';
                data.pretext = 'Patient has a brain tumor, deep inside.';
                data.fixtext = 'You\'ve finally found the tumor!';
                data.postext = 'You excised the tumor!';
                break;
            case 9:
                data.incneeded = 2;
                data.temp = 104.6;
                data.fever = 0.6;
                data.pulse = 30;
                data.scantext = 'a liver infection!';
                data.pretext = 'Patient has a liver infection.';
                data.fixtext = 'You\'ve accessed the liver.';
                data.postext = 'You treated the source of the infection!';
                break;
            case 10:
                data.incneeded = 2;
                data.temp = 101.6;
                data.fever = 1.2;
                data.scantext = 'kidney failure!';
                data.pretext = 'Patient suffers from kidney failure.';
                data.fixtext = 'You now have access to the bad kidney.';
                data.postext = 'You popped in a fresh new kidney!';
                break;
            case 11:
                data.incneeded = 3;
                data.temp = 104.6;
                data.fever = 1.2;
                data.pulse = 30;
                data.scantext = 'appendicitis!';
                data.pretext = 'Patient suffers from appendicitis.';
                data.fixtext = 'You now have access to the appendix.';
                data.postext = 'You yanked out the appendix!';
                break;
            case 13:
                data.incneeded = 2;
                data.temp = 101.6;
                data.bleeding = 1;
                data.dirt = 6;
                data.scantext = 'swallowed World Lock!';
                data.pretext = 'Patient has swallowed a world lock.';
                data.fixtext = 'You\'ve opened the stomach.';
                data.postext = 'You got the lock out!';
                break;
            case 13:
                data.incneeded = 3;
                data.temp = 100.4;
                data.scantext = 'a herniated disc!';
                data.pretext = 'Patient\'s spine is damaged.';
                data.fixtext = 'You\'ve opened up the vertebrae.';
                data.postext = 'You repaired the disc!';
                break;
            case 14:
                data.incneeded = 2;
                data.temp = 100.58;
                data.dirt = 6;
                data.bleeding = 1;
                data.shattered = 4;
                data.scantext = 'broken everything! You found 4 shattered bones.';
                data.pretext = 'Patient was run over by a truck.';
                data.fixtext = 'You\'ve found gravel in the knees.';
                data.postext = 'You removed the gravel!';
                break;
            case 15:
                data.incneeded = 1;
                data.pulse = 20;
                data.dirt = 6;
                data.bleeding = 4;
                data.scantext = 'a serious head injury!';
                data.pretext = 'Patient has a serious head injury.';
                data.fixtext = 'You\'ve opened the skull.';
                data.postext = 'You reduced the swelling!';
                break;
            case 16:
                data.incneeded = 2;
                data.pulse = 30;
                data.dirt = 10;
                data.bleeding = 3;
                data.broken = 2;
                data.shattered = 1;
                data.scantext = 'serious trauma! You found 2 broken bones and 1 shattered bone.';
                data.pretext = 'Patient suffered serious trauma with a punctured lung.';
                data.fixtext = 'You found the lung puncture.';
                data.postext = 'You repaired it.';
                break;
            case 17:
                data.incneeded = 3;
                data.pulse = 30;
                data.dirt = 10;
                data.bleeding = 4;
                data.broken = 2;
                data.shattered = 2;
                data.scantext = 'massive trauma! You found 2 broken bones and 2 shattered bones.';
                data.pretext = 'Patient suffered massive trauma with internal bleeding.';
                data.fixtext = 'You found the internal bleed.';
                data.postext = 'You cauterized it.';
                break;
            case 18:
                data.incneeded = 1;
                data.dirt = 15;
                data.scantext = 'torn punching muscle!';
                data.pretext = 'Patient has a torn punching muscle.';
                data.fixtext = 'You\'ve accessed the arm muscles. ';
                data.postext = 'You patched the torn punching muscle! They should be back to punching in no time.';
                break;
            case 19:
                data.fixable = false
                data.incneeded = 2;
                data.temp = 98.6;
                data.dirt = 0;
                data.fever = 0;
                data.bleeding = 1;
                data.scantext = 'gem cuts!';
                data.pretext = 'Patient is bleeding from multiple gem-induced cuts.a';
                data.fixtext = 'You\'ve examined the wounds.';
                data.postext = 'You\'ve stitches the gem cuts closed and stopped the bleeding.';
                break;
            case 20:
                data.fixable = false
                data.incneeded = 1
                data.temp = 104.6;
                data.pulse = 20;
                data.shattered = 1;
                data.dirt = 5;
                data.scantext = 'Grumbleteeth! You found 1 shattered bones.';
                data.pretext = 'Patient\'s teeth are chattering They sound angry.';
                data.fixtext = 'You removed grumbleteeth';
                data.postext = 'You\'ve replaced the patient\'s angriest teeth and quited';
                break;
            case 21:
                data.fixable = false;
                data.temp = 98.6;
                data.incneeded = 2;
                data.heart = 0;
                data.fever = 1.56;
                data.dirt = 10;
                data.shattered = 2;
                data.scantext = 'chicken feet! You found 2 shattered bones.';
                data.pretext = 'Patient feet have turned into chicken toes.';
                data.fixtext = 'You\'ve insvestigated the feet.';
                data.postext = 'You fixed the patient feet. They look like normal blocky toes again!';
                break;
            case 22:
                data.fixable = false;
                data.incneeded = 1;
                data.shattered = 2;
                data.temp = 107.6;
                data.fever = 1.2;
                data.dirt = 2;
                data.scantext = 'Broken Heart! You found 2 shattered bones.';
                data.pretext = 'Patient suffered from a Broken Heart.';
                data.fixtext = 'You\'ve revealed the heart.';
                data.postext = 'You\'ve repaired the fractured in the patient\'s heart';
                break;
            case 23:
                data.incneeded = 2;
                data.temp = 100.58;
                data.shattered = 1;
                data.fever = 0.8;
                data.dirt = 10;
                data.bleeding = 5;
                data.scantext = 'brain worms! You found 1 Shattered bone.';
                data.pretext = 'You\'ve exposed the brain.';
                data.fixtext = 'You made a neat incision.';
                data.postext = 'You\'ve shut down the worm party in the patient brain and cleared away their trash.';
                break;
            case 24:
                data.incneeded = 0;
                data.fixable = false;
                data.temp = 98.6;
                data.dirt = 0;
                data.broken = 6;
                data.shattered = 2;
                data.bleeding = 1;
                data.scantext = 'ecto bones! You found 6 Broken bones and 2 Shattered bones.';
                data.pretext = 'You\'ve exposed the ribs';
                data.fixtext = 'You made an incision';
                data.postext = 'You pinned down all patient major bones and dyed them back to their normal color.';
                break;
            case 25:
                data.fixable = false;
                data.pulse = 20;
                data.temp = 104.6;
                data.fever = 1.98;
                data.shattered = 1;
                data.incneeded = 2;
                data.scantext = 'Moldy Guts! You found 1 shattered bone.';
                data.pretext = 'Patient suffers from Moldy Guts.';
                data.fixtext = 'You\'ve openned the abdomen.';
                data.postext = 'You\'e cleaned out the patient\'s internal organs and applied a light air freshener';
                break;
            case 26:
                data.fixable = false;
                data.incneeded = 3;
                data.temp = 101.6;
                data.fever = 2.0;
                data.dirt = 10;
                data.incneeded = 3;
                data.bleeding = 3;
                data.scantext = 'fatty liver!';
                data.pretext = 'Patient suffered fatty liver.';
                data.fixtext = 'Patient poor diet has led to a high degree of fat build-up in their liver';
                data.postext = 'You pickup it.';
                break;
            case 27:
                data.fixed = false;
                data.incneeded = 3;
                data.temp = 105.6;
                data.broken = 2;
                data.fever = 2.6;
                data.dirt = 10;
                data.bleeding = 3;
                data.scantext = 'Chaos Infection! You found 2 Broken bones.';
                data.pretext = 'Patient suffered chaos infection.';
                data.fixtext = 'Patient poor diet has led to a high degree of fat build-up in their liver';
                data.postext = 'You removed it.';
                break;
            case 28:
                fixed = false;
                incneeded = 4;
                temp = 100.1;
                broken = 2;
                fever = 3.1;
                sleep = 3;
                shattered = 2;
                dirt = 10;
                incneeded = 3;
                bleeding = 3;
                scantext = 'Lupus! You found 2 Broken bones.';
                pretext = 'Patient suffered lupus.';
                fixtext = 'Chance of patient tearing skin, adding one extra incision';
                postext = 'You removed it.';
                break;
        }
        // surgData(data)
        this._surgData = data;
    }
    _custom(malady) {
        switch (malady.toLowerCase()) {
            case 'broken arm':
                this._setstats(0);
                this._draw();
                break;
            case 'broken leg':
                this._setstats(1);
                this._draw();
                break;
            case 'bird flu':
                this._setstats(2);
                this._draw();
                break;
            case 'turtle flu':
                this._setstats(3);
                this._draw();
                break;
            case 'monkey flu':
                this._setstats(4);
                this._draw();
                break;
            case 'nose job':
                this._setstats(5);
                this._draw();
                break;
            case 'lung tumor':
                this._setstats(6);
                this._draw();
                break;
            case 'heart attack':
                this._setstats(7);
                this._draw();
                break;
            case 'brain tumor':
                this._setstats(8);
                this._draw();
                break;
            case 'liver infection':
                this._setstats(9);
                this._draw();
                break;
            case 'kidney failure':
                this._setstats(10);
                this._draw();
                break;
            case 'appendicitis':
                this._setstats(11);
                this._draw();
                break;
            case 'swallowed world lock':
                this._setstats(13);
                this._draw();
                break;
            case 'herniated disc':
                this._setstats(13);
                this._draw();
                break;
            case 'broken everything':
                this._setstats(14);
                this._draw();
                break;
            case 'serious head injury':
                this._setstats(15);
                this._draw();
                break;
            case 'serious trauma':
                this._setstats(16);
                this._draw();
                break;
            case 'massive trauma':
                this._setstats(17);
                this._draw();
                break;
            case 'torn punching muscle':
                this._setstats(18);
                this._draw();
                break;
            case 'gem cuts':
                this._setstats(19);
                this._draw();
                break;
            case 'grumbleteeth':
                this._setstats(20);
                this._draw();
                break;
            case 'chicken feet':
                this._setstats(21);
                this._draw();
                break;
            case 'broken heart':
                this._setstats(22);
                this._draw();
                break;
            case 'brainworms':
                this._setstats(23);
                this._draw();
                break;
            case 'ecto-bones':
                this._setstats(24);
                this._draw();
                break;
            case 'moldy guts':
                this._setstats(25);
                this._draw();
                break;
            case 'fatty liver':
                this._setstats(26);
                this._draw();
                break;
            case 'chaos infection':
                this._setstats(27);
                this._draw();
                break;
            case 'lupus':
                this._setstats(28);
                this._draw();
                break;
            case 'random':
                this._setstats(Math.floor(Math.random() * 18));
                this._draw();
                break;
            default:
                this._setstats(Math.floor(Math.random() * 18));
                this._draw();
                break;
        }

    }

    _setSkill() {
        const generateCurrentSkill = Math.random() * 100 > (30 - this.skill / 4);
        const generateSkillFail = Math.round(30 - this.skill / 4);
        this._surgData.currentSkill = generateCurrentSkill;
        this._surgData.skillFail = generateSkillFail;
    }


    get currentSkill() {
        return this.surgData.currentSkill;
    }

    get skillFail() {
        return this.surgData.skillFail;
    }





    _onclickToolbutton() {
        let self = this;
        $("img.toolbutton").on("click", function () {
            let toolId = $(this).attr("id");
            self._usetool(toolId);

        });

    }
    _prizetext() {
        let rnd = Math.floor(Math.random() * 1001);
        if (rnd == 0)
            return 'Thingamabob'
        else if (rnd == 1)
            return 'Magnifying Glass'
        else if (rnd < 5)
            return 'Edison Zoomster'
        else if (rnd < 9)
            return 'Medical Scarf'
        else if (rnd < 15)
            return 'DNA Processor'
        else if (rnd < 20)
            return 'Techno Visor'
        else if (rnd < 25)
            return 'Cybernetic Eye'
        else if (rnd < 30)
            return 'Autoclave'
        else if (rnd < 35)
            return 'Steel Spike'
        else if (rnd < 40)
            return 'Wolf Whistle'
        else if (rnd < 45)
            return 'Antidote';
        else if (rnd < 50)
            return 'Legal Briefs'
        else if (rnd < 90)
            return 'Scrub Cap'
        else if (rnd < 130)
            return 'Scrub Mask'
        else if (rnd < 170)
            return 'Scrub Top'
        else if (rnd < 210)
            return 'Scrub Pants'
        else if (rnd < 250)
            return 'Candy Striper Hat'
        else if (rnd < 290)
            return 'Candy Striper Uniform'
        else if (rnd < 330)
            return 'Candy Striper Skirt'
        else if (rnd < 370)
            return 'Hospital Wall'
        else if (rnd < 410)
            return 'Hospital Window'
        else if (rnd < 450)
            return 'Hospital Curtain'
        else if (rnd < 490)
            return 'Hospital Bed'
        else if (rnd < 510)
            return 'Homeopathic Medicine'
        else if (rnd < 580)
            return 'Surgical Scalpel'
        else if (rnd < 650)
            return 'Surgical Stitches'
        else if (rnd < 720)
            return 'Surgical Sponge'
        else if (rnd < 790)
            return 'Surgical Antiseptic'
        else if (rnd < 860)
            return 'Surgical Anesthetic'
        else if (rnd < 930)
            return 'Surgical Antibiotics'
        else
            return 'Surgical Splint';

    }
    _settings() {
        // open surgery setting
        const openbutton = $('#opensetting');
        const settingtab = $('surg-set');
        const alerttab = $('#surgalert');
        const alertclosebutton = alerttab.find('#closealert');

        openbutton.on('click', function () {
            settingtab.removeClass('hidden').addClass('flex');
            setTimeout(() => {
                settingtab.find('.notif').addClass('show');
            }, 50);
        });

        alertclosebutton.on('click', function () {
            alerttab.find('.notif').removeClass('show');
            setTimeout(() => {
                alerttab.removeClass('flex').addClass('hidden');
            }, 501);
        });
        $(document).on('change', 'input#skill', function () {
            $('surg-sim').attr('skill', Number($(this).val()))
        });
    }
    run() {
        // date-ver
        const datever = document.querySelector('#date-ver');
        const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        datever.innerHTML = `${date}: <span class='text-[#FFA500]'>Version 1.00</span>`;
        this._draw();
        this._setstats(Math.floor(Math.random() * 18));
        this._onclickToolbutton();
        this._settings();

    }
}

customElements.define('surg-sim', SurgSimulator);
