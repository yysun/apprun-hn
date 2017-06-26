import Firebase = require('firebase');

Firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = Firebase.database().ref('/v0');

export async function fetch(path): Promise<any> {
  const ref = db.child(path);
  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => resolve(snapshot.val()), reject);
  })
}

export async function fetchList(type): Promise<any> {
  return fetch(`${type}stories`);
}

export async function fetchListItems(list): Promise<any> {
  list.items = await Promise.all(list.items.map(async (item, idx) => {
    return (idx >= list.min && idx < list.max && (typeof item === 'number')) ?
      await fetch(`item/${item}`) : item
  }));
}

export async function fetchItem(id): Promise<any> {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) item.kids = await Promise.all(item.kids.map(async (item) => {
    return typeof item === 'number' ?
      await fetchItem(item) : item
  }));
  return item;
}