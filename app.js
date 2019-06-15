const buttonEnter = document.getElementById('enter');
buttonEnter.addEventListener("click", (e)=>{
    httpGet(prepareUrl()).then(
        response => {
            const divResult = document.getElementById('result');
            response = JSON.parse(response);
            const result = `
            <ul>
            <li>
            Email address: ${response.email}
            </li>
            <li>
            Did You Mean? ${response.did_you_mean}
            </li>
            <li>
            Valid Format: ${response.format_valid}
            </li>
            <li>
            SMTP: ${response.smtp_check}
            </li>
            <li>
            Role: ${response.role}
            </li>
            <li>
            Disposable: ${response.disposable}
            </li>
            <li>
            Free: ${response.free}
            </li>
            </ul>
            `;
            divResult.innerHTML = result;
    }, error => {
        alert(`Rejected: ${error}`)
    });
});


function prepareUrl(){
    const inputEmail = document.getElementById('email');
    return `https://apilayer.net/api/check?access_key=326bfc204e238fd5cdab96e8f86aa37d&email=${inputEmail.value}`;
}

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
  
      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };
  
      xhr.send();
    });
  
  }