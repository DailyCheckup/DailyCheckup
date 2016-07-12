const AJAX = {

  postRequest(url, postData, successFn, errorFn) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(postData));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log('ready state is 4');
        if (xhr.status === 200) {
          console.log('status is 200');
          successFn(xhr.responseText);
        } else {
          console.log('Error: ', xhr.status);
          errorFn();
        }
      }
    };
  },
};

module.exports = AJAX;
