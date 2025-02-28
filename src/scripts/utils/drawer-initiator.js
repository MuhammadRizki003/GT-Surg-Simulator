import $ from "jquery";
const DrawerInitiator = {
    init({ button, drawer, content }) {
      button.addEventListener('click', (event) => {
        this._toggleDrawer(event, drawer);
      });
   
      content.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
      });
    },
   
    _toggleDrawer(event, drawer) {
      event.stopPropagation();
      if ($(drawer).hasClass('max-[500px]:right-[-260px]')) {
        
        this._openDrawer(event, drawer);
      }else{
        this._closeDrawer(event, drawer);
      }
    },
    
    _openDrawer(event, drawer){
        drawer.classList.remove('max-[500px]:right-[-260px]');
        drawer.classList.add('max-[500px]:right-0');
    },
   
    _closeDrawer(event, drawer) {
        drawer.classList.remove('max-[500px]:right-0');
        drawer.classList.add('max-[500px]:right-[-260px]');
    },
  };
   
  export default DrawerInitiator;