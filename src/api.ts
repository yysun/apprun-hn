import app from 'apprun';

declare let firebase;

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = firebase.database().ref('/v0');

const fetch = async (path): Promise<any> => {
  const ref = db.child(path);
  return new Promise((resolve) => {
    ref.once('value', snapshot => resolve(snapshot.val())); // tslint:disable-line
  })
}

const fetchItem = async (id): Promise<any> => {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) item.kids = await Promise.all(item.kids.map(async kid => {
    return typeof kid === 'number' ?
      await fetchItem(kid) : kid
  }));
  return item;
}

app.on('get-list', async (type, list) => {
  const fetchListItems = async ({ items, min, max }) => {
    await Promise.all(items.map(async (id, idx) => {
      if (idx >= min && idx < max && (typeof id === 'number')) {
        items[idx] = await fetch(`item/${id}`)
      }
    }));
    app.run('render');
  }
  if (list.items.length) {
    await fetchListItems(list);
  } else {
    const ref = db.child(`${type}stories`);
    ref.on('value', async snapshot => {
      list.items = snapshot.val();
      await fetchListItems(list);
    });
  }
});

app.on('get-item', (id, state) => {
  if (!id) return;
  const ref = db.child(`item/${id}`);
  ref.on('value', async snapshot => {
    state[id] = snapshot.val();
    if (state[id].kids) {
      state[id].kids = await Promise.all(state[id].kids.map(async kid => {
        return typeof kid === 'number' ?
          await fetchItem(kid) : kid
      }));
    }
    app.run('render');
  });
});

