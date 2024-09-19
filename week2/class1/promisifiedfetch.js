function fetchpromise(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(response.statusText);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

fetchpromise('https://jsonplaceholder.typicode.com/posts/1')    
.then(data=>console.log(data))
.catch(error=>console.log(error));