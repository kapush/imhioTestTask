const buttonEnter = document.getElementById('enter');

buttonEnter.addEventListener("click", (e)=>{
    httpGet(prepareUrl()).then(
        response => {
            let result = JSON.parse(response);
            outputResult(result);
             
    }).catch(
      error => console.log(`Rejected: ${error}`)
    );
});

function httpGet(url) {

    return new Promise(function(resolve, reject) {
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };    
      xhr.send();
      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };
    });
  
  }

function prepareUrl(){
  const inputEmail = document.getElementById('email');
  return `https://apilayer.net/api/check?access_key=326bfc204e238fd5cdab96e8f86aa37d&email=${inputEmail.value}`;
}

  function outputResult(response){
    const divResult = document.getElementById('result');
    divResult.hidden = false;
    const result = `
            Email address: ${response.email}<br>
            Did You Mean? ${response.did_you_mean}<br>
            Valid Format: ${response.format_valid}<br>
            SMTP: ${response.smtp_check}<br>
            Role: ${response.role}<br>
            Disposable: ${response.disposable}<br>
            Free: ${response.free}
            `;
            divResult.innerHTML = result;
  }