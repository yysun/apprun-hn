import app, { Component } from '../node_modules/apprun/index';
import { fetchList, fetchListItems, fetchItem } from './api';
import { Comment, Comments, Item, ListItem, List, ListHeader, viewList, viewItem } from './components';

const root = '#hacker-news';
const page_size = 20;

export default class HackerNewsComponent extends Component {

  state = {
    type: 'top',
  };

  view = (state) => {
    return state.type === 'item' ? viewItem(state) : viewList(state);
  }


  update = {
    '/': _ => app.run(root),

    '#hacker-news': async (state, type, ...args) => {
      type = type || state.type
      return type === 'item' ?
        this.showItem(state, args[0]) :
        this.showList(state, type, args[0])
    }
  }

  showList = async (state, type?, pageno?) => {
    if (!type || !pageno) {
      type = type || state.type || 'top';
      pageno = pageno || (state[type] && state[type].pageno) || 1;
      history.replaceState(null, null, `${root}/${type}/${pageno}`);
    }
    const new_state = { ...state, type };
    if (!new_state[type]) {
      console.log(`fetch: ${type}`);
      new_state[type] = {
        items: await fetchList(type),
        page_size
      }
    }
    await fetchListItems(new_state[type], parseInt(pageno));
    this.setState(new_state); // ?
    return new_state;
  }

  showItem = async (state, id) => {
    if (!id || isNaN(parseInt(id))) {
      id = state.key;
      history.replaceState(null, null, `${root}/item/${id}`);
    }
    const key = `${id}`;
    const new_state = { ...state, type: 'item', key };
    if (!new_state[key]) {
      console.log(`fetch: ${key}`);
      new_state[key] = await fetchItem(id);
    }
    this.setState(new_state); // ?
    return new_state;
  }

}

document.body.addEventListener('click', e => {
  const t = e.target as HTMLElement;
  if (t.matches('.toggle')) {
    t.classList.toggle('closed');
    t.nextElementSibling && t.nextElementSibling.classList.toggle('collapsed');
  }
});

const element = document.getElementById('my-app');
new HackerNewsComponent().mount(element);