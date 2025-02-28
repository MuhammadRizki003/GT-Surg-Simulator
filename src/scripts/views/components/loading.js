import $ from "jquery";

class Loading extends HTMLElement {
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
        $(this).addClass('fixed w-screen h-screen top-0 bg-black/70 flex justify-center items-center z-[998]');
        this.innerHTML += `
      <div class="w-24 h-24 bg-black/95 rounded-2xl flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style="shape-rendering: auto;">
          <g>
            <rect fill="#4481a6" height="20" width="20" y="19" x="19">
              <animate calcMode="discrete" begin="0s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="19" x="40">
              <animate calcMode="discrete" begin="0.125s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="19" x="61">
              <animate calcMode="discrete" begin="0.25s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="40" x="19">
              <animate calcMode="discrete" begin="0.875s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="40" x="61">
              <animate calcMode="discrete" begin="0.375s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="61" x="19">
              <animate calcMode="discrete" begin="0.75s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="61" x="40">
              <animate calcMode="discrete" begin="0.625s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <rect fill="#4481a6" height="20" width="20" y="61" x="61">
              <animate calcMode="discrete" begin="0.5s" repeatCount="indefinite" dur="1s" keyTimes="0;0.125;1"
                values="#2ed413;#4481a6;#4481a6" attributeName="fill" />
            </rect>
            <g />
          </g>
        </svg>
        <span class="text-white font-semibold pb-1">loading!</span>
      </div>
        `;
    }

}

customElements.define('load-box', Loading);
