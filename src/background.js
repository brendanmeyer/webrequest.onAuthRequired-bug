const sleep = ms => new Promise(r => setTimeout(r, ms));

sleep(3000).then(() => {
  var onAuthRequired = (details, asyncCallback) => {
    console.log("onAuthChromeHandler1", details);
    chrome.webRequest.onAuthRequired.removeListener(onAuthRequired);
    asyncCallback({
      authCredentials: {
        username: "test",
        password: "test1"
      }
    });
  }
  chrome.webRequest.onAuthRequired.addListener(onAuthRequired, { urls: ["https://httpbin.io/*"] }, ["asyncBlocking"]);
  new Promise((resolve, reject) => {
    fetch('https://httpbin.io/basic-auth/test/test', {
      method: 'GET'
    })
      .then(console.log)
      .then((json) => {
          resolve();
      })
      .catch((error) => reject(error))
      .finally(() => { chrome.webRequest.onAuthRequired.removeListener(onAuthRequired); });
  });
});

sleep(10000).then(() => {
  var onAuthRequired = (details, asyncCallback) => {
    console.log("onAuthChromeHandler2", details);
    chrome.webRequest.onAuthRequired.removeListener(onAuthRequired);
    asyncCallback({
      authCredentials: {
        username: "test",
        password: "test"
      }
    });
  }
  chrome.webRequest.onAuthRequired.addListener(onAuthRequired, { urls: ["https://httpbin.io/*"] }, ["asyncBlocking"]);
  new Promise((resolve, reject) => {
    fetch('https://httpbin.io/basic-auth/test/test', {
      method: 'GET'
    })
      .then(console.log)
      .then((json) => {
          resolve();
      })
      .catch((error) => reject(error))
      .finally(() => { chrome.webRequest.onAuthRequired.removeListener(onAuthRequired); });
  });
});
