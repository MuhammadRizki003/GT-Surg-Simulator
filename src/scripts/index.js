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
// window.addEventListener('hashchange', () => {
//   app.renderPage();
// });
 
// window.addEventListener('load', () => {
//   app.renderPage();
// });
