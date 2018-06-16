import app from 'apprun';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = firebase.database().ref('/v0');

const fetchJSON = async (url: string) => {
  url = `https://hacker-news.firebaseio.com/v0/${url}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    const data = await response.text();
    throw data;
  }
  return response.json();
}

const fetchItem = async ({ id }) => {
  const item = await fetchJSON(`item/${id}`);
  if (item && item.kids) item.kids =
    await Promise.all(item.kids.map((kid) =>
      typeof kid === 'number' ? fetchItem({ id: kid }) : kid
    ));
  return item;
}

export const getItem = (id) => {
  const ref = db.child(`item/${id}`);
  ref.on('value', async snapshot => {
    const item = await fetchItem(snapshot.val());
    app.run('refresh', id, item);
  })
};

const cache = {};
export const getList = (category, min, max) => {
  const ref = db.child(`${category}stories`);
  ref.on('value', async snapshot => {
    const items = await Promise.all(snapshot.val().map((id, idx) => {
      let item = id;
      if (idx >= min && idx < max && (typeof id === 'number')) {
        item = cache[id] || fetchJSON(`item/${id}`);
        cache[id] = item;
      }
      return item;
    }
  ));
    app.run('refresh', category, { min, max, items });
  })
};
