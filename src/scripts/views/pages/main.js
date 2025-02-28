import $ from "jquery";
import SurgTools from "../../data/surg-tool";
const main = {
  async render() {
    return `
        <load-box></load-box>
        <surg-alert></surg-alert>
        <surg-set></surg-set>
        <div class="bg-black absolute top-0 w-full h-[1000px]">
          <div class="bg-[url(./../../public/bgweather.webp)] h-full w-full flex bg-bottom opacity-50"></div>
        </div>
        <div class="absolute z-10 w-full top-0 mt-8">
          <div class="flex flex-col gap-5">
            <tab-head></tab-head>
            <!-- start surg simulator -->
            <surg-sim></surg-sim>
            <!-- end surg simulator -->
            <h2 class="text-4xl font-bold text-center text-white w-full bg-[#E31C30]/70 py-4 px-4">Surgery Tools</h2>
            <surgtool-con>
            </surgtool-con>
            <!-- end surg tool -->
            <foot-tab></foot-tab>
          </div>
        </div>
        <!-- end container -->
      `;
  },

  async afterRender() {
    const toolsContainer = $('surgtool-con div #tool-container');
    const tools = SurgTools.getTools();
    tools.forEach(tool => {
      const toolItem = document.createElement('surgtool-item');
      toolItem.data = tool;
      toolsContainer.append(toolItem);
    });
    $(document).ready(function () {
      $('load-box').remove();
    });

  },
};

export default main;