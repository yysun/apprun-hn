import app from '../node_modules/apprun/index';

const root = '#hacker-news';
export const Loading = () => <div className='loading'>Loading ... </div>;

export const Comment = ({ comment }) => {
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

export const Comments = ({ item }) => {
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

export const Item = ({ item }) => {
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

export const ListItem = ({ item, idx }) => {
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

export const List = ({ list }) => {
  if (!list) return;
  return <div>
    <ul className='story-list'> {
      list.items.filter((_, i) => i >= list.min && i < list.max)
        .map(item => <this.ListItem item={item} idx={list.items.indexOf(item) + 1} />)
    }
    </ul>
    {list.items && list.max < list.items.length &&
      <div className='more'><a onclick={() => app.run('#more')}>More ...</a></div>}
  </div>;
}

export const ListHeader = ({ list, type }) => {
  if (!list) return;
  const style = (enable: boolean) => enable ?
    { cursor: 'pointer' } :
    { 'pointer-events': 'none' };
  return <div style={{ 'padding-left': '380px' }}>
    <span>{list.min + 1} - {list.max} ({list.items.length})</span>
    {/*&nbsp;&nbsp;<a href={`${root}/${type}/${list.pageno - 1}`} style={style(list.pageno > 1)}>&lt;&lt;</a>
      &nbsp;&nbsp;<a href={`${root}/${type}/${list.pageno + 1}`} style={style(list.pageno < list.pages)}>&gt;&gt;</a>*/}
  </div>
}

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