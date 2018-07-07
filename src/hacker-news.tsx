import app from 'apprun';
import './api';

const page_size = 30;

const Comment = ({ comment }) => {
  if (!comment) return;
  return <li className='comment'>
    <div className='meta'>
      <span>by {comment.by}</span> |&nbsp;
      <span>{timeAgo(comment.time)} ago</span>
    </div>
    <div className='text'>{`_html:${comment.text}`}</div>
    <Comments item={comment} />
  </li>
}

const Comments = ({ item }) => {
  if (!item || !item.kids) return;
  const list = item.kids;
  const num = item.kids && item.kids.filter(items => item && !item.deleted && !item.dead).length;
  return <div>
    {num && <div className='toggle'>{pluralize(num, ' comment')} </div>}
    <ul className='comment-list'> {
      list.filter(comment => comment && !comment.deleted)
        .map(comment => <Comment comment={comment} />)
    }
    </ul>
  </div>;
}

const Item = ({ item }) => {
  if (!item) return;
  return <div className='story'>
    <h4><a href={item.url} target="_blank">{item.title}</a></h4>
    {(item.text) && <div className='text'>{`_html:${item.text}`}</div>}
    <div className='meta'>
      <span>{pluralize(item.score, ' point')}</span> |&nbsp;
        <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span>{pluralize(item.descendants, ' comment')} (in total)  |&nbsp;</span>
      <span><a onclick={() => history.back()}>back</a></span>
    </div>
    <Comments item={item} />
  </div>
}

const ListItem = ({ item, idx }) => {
  if (!item) return;
  const item_link = `#/item/${item.id}`;
  return <li>
    <div className={'score'}>{item.score}</div>
    <div><a href={item.url || item_link} target="_blank">{item.title}</a></div>
    <div className='meta'>
      <span>by {item.by}</span> |&nbsp;
        <span>{timeAgo(item.time)} ago</span> |&nbsp;
        <span><a href={`${item_link}`}>{pluralize(item.descendants, ' comment')}</a></span>
    </div>
  </li>
}

const List = ({ list }) => {
  if (!list || !list.items) return;
  return <div>
    <ul className='story-list'> {
      list.items.filter((item, i) => i >= list.min && i < list.max && (typeof item !== 'number'))
        .map(item => <ListItem item={item} idx={list.items.indexOf(item) + 1} />)
    }
    </ul>
    <div className='more'>
      <span>{list.min + 1} - {list.max} ({list.items.length}) &nbsp;</span>
      {list.items && list.max < list.items.length && <a onclick={() => app.run('more')}> |&nbsp; More ...</a>}
    </div>
  </div>;
}

const view = state => {
  if (state instanceof Promise) return;
  const style = (type) => ({ 'font-weight': type === state.type ? 'bold' : 'normal' });
  return <div className={`hn ${state.type}`}>
    <div className='header'>
      <div className='inner'>
        <div style={{ 'float': 'left' }}>
          <span style={{ 'margin-right': '20px' }}>
            <a href='#'>AppRun&#10084;&nbsp;HN</a>
          </span>
          <a style={style('top')} href={`#/top`}>Top</a> |&nbsp;
          <a style={style('new')} href={`#/new`}>New</a> |&nbsp;
          <a style={style('best')} href={`#/best`}>Best</a> |&nbsp;
          <a style={style('show')} href={`#/show`}>Show</a> |&nbsp;
          <a style={style('ask')} href={`#/ask`}>Ask</a> |&nbsp;
          <a style={style('job')} href={`#/job`}>Jobs</a>
        </div>
      </div>
    </div>
    <div className='main'>
      <div className='inner'>
        {state.type === 'item' ?
          <Item item={state[state.id]} /> :
          <List list={state[state.type]} />}
      </div>
    </div>
    <div className='footer'>
      <div className='inner'>
        Powered by <a href='https://github.com/yysun/apprun'>AppRun</a>,
        Source code: <a href='https://github.com/yysun/apprun-hn'>Github</a>
      </div>
    </div>
  </div>
}

const update = {
  '#': (state, type, id) => {
    type = type || 'top';
    state.type = type;
    state[type] = state[type] || { min: 0, max: page_size, items: [] };
    state.id = id;
    type === 'item' ?
      app.run('get-item', id, state) :
      app.run('get-list', type, state[type]);
  },
  'render': state => state,
  'more': state => {
    const list = state[state.type];
    list.max = Math.min(list.max + page_size, list.items.length)
    app.run('get-list', state.type, list);
  },
}


app.start('my-app', {}, view, update);

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

