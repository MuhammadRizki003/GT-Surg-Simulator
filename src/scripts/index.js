import 'regenerator-runtime';
import $ from 'jquery';
import './styles/style.css';
import './styles/output.css';
import App from './views/app';
import './views/components';
const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#navbar'),
  content: document.querySelector('#mainContent'),
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});
 
window.addEventListener('load', () => {
  app.renderPage();
});
window.addEventListener('scroll', () => {
  const header = $('header');
  const scrollY = window.scrollY;
  function  scroll () {
    header.removeClass('bg-transparent bg-[#1E1F22]').addClass('bg-[#0D1117]');
  }
  function notScroll(){
    header.removeClass('bg-transparent bg-[#0D1117]').addClass('bg-[#1E1F22]');
  }
  if (scrollY === 0) {
    notScroll();
  } else if (scrollY > 50) {
    scroll()
  } else {
    notScroll();
  }
});
