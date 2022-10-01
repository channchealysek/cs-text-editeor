import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT function
export const putDb = async (content) => {
  console.log('PUT request to update the jateDB');
  // connect to database and version
  const jateDb = await openDB('jate', 1);
  // create new transaction that we need to specify the database are posting to and set data privilage.
  const tx = jateDb.transaction('jate', 'readwrite');
  // open object for data storage
  const objStore = tx.objectStore('jate');
  // use function .put() method to pass contents.
  const req = objStore.put({ content })
  // confirm the data was added.
  const res = await req;
  // print statement to console for user.
  console.log('data saved to the jateDB', res);
};

// GET function
export const getDb = async () => {
  console.log('Getting data from the jateDB');
  // connect to database and version
  const jateDb = await openDB('jate', 1);
  // create new transaction that we need to specify the database are posting to and set data privilage.
  const tx = jateDb.transaction('jate', 'readwrite');
  // open object for data storage
  const objStore = tx.objectStore('jate');
  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll()
  // confirm the data was fetched
  const res = await req;
   // print statement to console for user.
  console.log('data saved to the jateDB', res);
};

initdb();