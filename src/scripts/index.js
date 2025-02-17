import 'regenerator-runtime';
import $ from 'jquery';
import './styles/style.css';
import './styles/output.css';
import App from './views/app';
const app = new App({
  // button: document.querySelector('#hamburgerButton'),
  // drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
