import app, { Component } from 'apprun';
import { fetchList, fetchListItems, fetchItem } from './api';

app.on('//', _ => { });
app.on('#', _ => { });

const root = '#hacker-news';
const page_size = 30;

export default class HackerNewsComponent extends Component {

  state = {
    type: 'top',
  };

  Loading = () => <div className='loading'>Loading ... </div>;

  Comment = ({ comment }) => {
    if (!comment) return;
    return <li className='comment'>
      <div className='meta'>
        <span>by {comment.by}</span> |&nbsp;
        <span>{timeAgo(comment.time)} ago</span>
      </div>
      <div className='text'>{`_html:${comment.text}`}</div>
      <this.Comments item={comment} />
    </li>
  }

  Comments = ({ item }) => {
    if (!item || !item.kids) return;
    const list = item.kids;
    const num = item.kids && item.kids.filter(items => !item.deleted && !item.dead).length;
    return <div>
      {num && <div className='toggle'>{pluralize(num, ' comment')} </div>}
      <ul className='comment-list'> {
        list.filter(item => !item.deleted)
          .map(item => <this.Comment comment={item} />)
      }
      </ul>
    </div>;
  }

  Item = ({ item }) => {
    if (!item) return;
    return <div className='story'>
      <h4><a href={item.url}>{item.title}</a></h4>
      {(item.text) && <div className='text'>{`_html:${item.text}`}</div>}
      <div className='meta'>
        <span>{pluralize(item.score, ' point')}</span> |&nbsp;
        <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span>{pluralize(item.descendants, ' comment')} (in total)  |&nbsp;</span>
        <span><a onclick={() => history.back()}>back</a></span>
      </div>
    </div>
  }

  ListItem = ({ item, idx }) => {
    if (!item) return;
    const item_link = `${root}/item/${item.id}`;
    return <li>
      <div className={'score'}>{item.score}</div>
      <div><a href={item.url || item_link}>{item.title}</a></div>
      <div className='meta'>
        <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span><a href={`${item_link}`} >{pluralize(item.descendants, ' comment')}</a></span>
      </div>
    </li>
  }

  List = ({ list }) => {
    if (!list) return;
    return <div>
      <ul className='story-list'> {
        list.items.filter((_, i) => i >= list.min && i < list.max)
          .map(item => <this.ListItem item={item} idx={list.items.indexOf(item) + 1} />)
      }
      </ul>
      <div className='more'>
        <span>{list.min + 1} - {list.max} ({list.items.length}) &nbsp;</span>
        {list.items && list.max < list.items.length && <a onclick={() => this.run('more')}> |&nbsp; More ...</a>}
      </div>
    </div>;
  }

  view = (state) => {
    let _list, _item
    if (state instanceof Promise) {
      // extra = <this.Loading />
      return
    } else if (state.type === 'item') {
      const item = state[state.key];
      _item = <this.Item item={item} />
      _list = <this.Comments item={item} />
    } else {
      const list = state[state.type];
      _list = <this.List list={list} />
    }
    const style = (type) => {
      return { 'font-weight': type === state.type ? 'bold' : 'normal' }
    }
    return <div className={`hn ${state.type}`}>
      <div className='header'>
        <div className='inner'>
          <div style={{ 'float': 'left' }}>
            <span style={{ 'margin-right': '20px' }}>
              <a href='https://github.com/yysun/apprun'>AppRun</a> &#10084;&nbsp;
              <a href='https://news.ycombinator.com'>HN</a></span>
              <a style={style('top')} href={`${root}/top`}>Top</a> |&nbsp;
              <a style={style('new')} href={`${root}/new`}>New</a> |&nbsp;
              <a style={style('best')} href={`${root}/best`}>Best</a> |&nbsp;
              <a style={style('show')} href={`${root}/show`}>Show</a> |&nbsp;
              <a style={style('ask')} href={`${root}/ask`}>Ask</a> |&nbsp;
              <a style={style('job')} href={`${root}/job`}>Jobs</a> |&nbsp;
              <a style='' href='https://github.com/yysun/apprun-hn'>Github</a>
          </div>
          {/*<div style={{ 'float': 'right' }}><a href='https://github.com/yysun/apprun-hn'>Github</a></div>*/}
        </div>
      </div>
      <div className='inner'>
        {_item}
        {_list}
      </div>
    </div>
  }

  update = {
    '#': _ => app.run(root),
    '#hacker-news': async (state, type, ...args) => {
      type = type || state.type
      return type === 'item' ?
        this.showItem(state, args[0]) :
        this.showList(state, type, args[0])
    },
    'more': async (state) => {
      const list = state[state.type];
      if (list && list.items) {
        list.max = Math.min(list.max + page_size, list.items.length)
        await fetchListItems(state[state.type]);
      }
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

function pluralize(number, label) {
  if (!number) number = 0;
  return (number === 1) ? number + label : number + label + 's'
}

function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

const element = document.getElementById('my-app');
new HackerNewsComponent().start(element);