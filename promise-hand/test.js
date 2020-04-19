const Promise = require('./完整版本');

const P1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'ccc' });
  }, 3000);
});

Promise.all([1, P1, 3]).then(d => {
  console.log(d);
});
