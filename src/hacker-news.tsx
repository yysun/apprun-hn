import app, { Component } from '../node_modules/apprun/index';
import { fetchList, fetchListItems, fetchItem } from './api';
import { Comment, Comments, Item, ListItem, List, ListHeader } from './components';

const root = '#hacker-news';
const page_size = 20;

export default class HackerNewsComponent extends Component {

  state = {
    type: 'top',
  };

  view = (state) => {
    let extra, _list, _item
    if (state instanceof Promise) {
      // extra = <this.Loading />
      return
    } else if (state.type === 'item') {
      const item = state[state.key];
      _item = <Item item={item} />
      _list = <Comments item={item} />
    } else {
      const list = state[state.type];
      extra = <ListHeader list={list} type={state.type} />
      _list = <List list={list} />
    }
    const style = (mtype) => {
      return { 'font-weight': mtype === state.type ? 'bold' : 'normal' }
    }
    return <div className={`hn ${state.type}`}>
      <div className='header'>
        <div className='inner'>
          <div style={{'float':'left'}}>
          <a style={style('top')} href={`${root}/top`}>Top</a> |&nbsp;
          <a style={style('new')} href={`${root}/new`}>New</a> |&nbsp;
          <a style={style('best')} href={`${root}/best`}>Best</a> |&nbsp;
          <a style={style('show')} href={`${root}/show`}>Show</a> |&nbsp;
          <a style={style('ask')} href={`${root}/ask`}>Ask</a> |&nbsp;
          <a style={style('job')} href={`${root}/job`}>Jobs</a>
          </div>
          {extra}
        </div>
      </div>
      <div className='fixed'>
        {_item}
      </div>
      <div className='list'>
        {_list}
      </div>
    </div>
  }

  update = {
    '/': _ => app.run(root),
    '#hacker-news': async (state, type, ...args) => {
      type = type || state.type
      return type === 'item' ?
        this.showItem(state, args[0]) :
        this.showList(state, type, args[0])
    },
    '#more': async (state) => {
      const list = state[state.type];
      if (list && list.items) {
        list.max = Math.min(list.max + 20, list.items.length)
        await fetchListItems(state[state.type]);
      }
      this.setState(state); // ?
      return state;
    }
  }

  showList = async (state, type?, pageno?) => {
    if (!type || !pageno) {
      type = type || state.type || 'top';
      pageno = pageno || (state[type] && state[type].pageno) || 1;
      history.replaceState(null, null, `${root}/${type}`);
    }
    const new_state = { ...state, type };
    if (!new_state[type]) {
      console.log(`fetch: ${type}`);
      new_state[type] = {
        items: await fetchList(type),
        min: 0,
        max: page_size
      }
    }

    pageno = parseInt(pageno) || 1;
    new_state[type] = {
      ...new_state[type],
      // min: (pageno - 1) * page_size,
      // max: pageno * page_size,
      pageno,
      pages: Math.ceil(new_state[type].items.length / page_size)
    }

    await fetchListItems(new_state[type]);
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