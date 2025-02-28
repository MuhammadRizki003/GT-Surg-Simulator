import main from '../views/pages/main';
import surgtips from '../views/pages/surgery-tips';
 
const routes = {
  '/': main, // default page
  '/main': main,
  '/surgery-tips': surgtips,
};
 
export default routes;