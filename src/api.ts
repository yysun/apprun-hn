import app from 'apprun';
import Firebase = require('firebase');

Firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = Firebase.database().ref('/v0');

const fetch = async (path): Promise<any> => {
  const ref = db.child(path);
  return new Promise((resolve, reject) => {
    ref.once('value', snapshot => resolve(snapshot.val()), reject);
  })
}

const fetchItem = async (id): Promise<any> => {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) item.kids = await Promise.all(item.kids.map(async (item) => {
    return typeof item === 'number' ?
      await fetchItem(item) : item
  }));
  return item;
}

app.on('get-list', (type, list) => {
  const fetchListItems = async ({ items, min, max }) => {
    await Promise.all(items.map(async (id, idx) => {
      if (idx >= min && idx < max && (typeof id === 'number')) {
        items[idx] = await fetch(`item/${id}`)
      }
    }));
    app.run('render');
  }
  if (list.items.length) return fetchListItems(list);
  const ref = db.child(`${type}stories`);
  ref.on('value', async snapshot => {
    list.items = snapshot.val();
    fetchListItems(list);
  })
});

app.on('get-item', (id, state) => {
  if (!id) return;
  const ref = db.child(`item/${id}`);
  ref.on('value', async snapshot => {
    state[id] = snapshot.val();
    if (state[id].kids) {
      state[id].kids = await Promise.all(state[id].kids.map(async (id) => {
        return typeof id === 'number' ?
          await fetchItem(id) : id
      }));
    }
    app.run('render');
  })
});
