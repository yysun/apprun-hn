declare let firebase;

firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' });
const db = firebase.database().ref('/v0');

const fetch = async (path): Promise<any> => {
  const ref = db.child(path);
  return new Promise((resolve) => {
    ref.once('value', snapshot => resolve(snapshot.val()));
  })
};

export const getItem = async (id): Promise<any> => {
  const item = await fetch(`item/${id}`);
  if (item && item.kids) {
    item.kids = item.kids.filter(item => item && !item.deleted && !item.dead);
    item.kids = await Promise.all(item.kids.map(async kid =>
      typeof kid === 'number'
        ? await getItem(kid)
        : kid
    ));
  }
  return item;
};

export const getList = async (type, min, max) => {
  let items = await fetch(`${type}stories`);
  max = Math.min(max, items.length);
  await Promise.all(items.map(async (id, idx) => {
    if (idx >= min && idx < max && (typeof id === 'number'))
      items[idx] = await fetch(`item/${id}`)
    }
  ));
  return { items, min, max };
};
