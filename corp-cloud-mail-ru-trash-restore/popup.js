//let doBtn = document.getElementById('doBtn');//.addEventListener('click',getListFromTrash);
let restoreAllBtn = document.getElementById('restoreAllBtn');
let getStateRestoreAllBtn = document.getElementById('getStateRestoreAllBtn');
let tokenInput = document.getElementById('token');
let tokenParagraf = document.getElementById('tokenParagraf'); 
let stateResult = '';


// слушатель клика
restoreAllBtn.addEventListener("click", async () => {
	let token = tokenInput.value;
	if (token == 'AG_a1...' || token == ''  )
	{
		tokenInput.style.color='#FF0000';
		tokenParagraf.style.color='red'
		return false;
	}
	else {
		tokenInput.style.color='#000000';
		tokenParagraf.style.color='#000000'; 
	}
	// получаем доступ к активной вкладке
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	// выполняем скрипт
	chrome.scripting.executeScript({
		// скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
		target: { tabId: tab.id },
		// вызываем функцию восстановления
		func: restoreAll,
		args: [token],
	});
});

function restoreAll(token) {
	const myHeaders = new Headers();
	myHeaders.append('X-CSRF-Token', token);

	var raw = "{}";

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  mode: 'cors',
	  cache: 'default',
	  redirect: 'follow'
	};


	fetch("https://cloud.mail.ru/api/v1/necromancer/restore_all", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}



//////////////////////////

getStateRestoreAllBtn.addEventListener("click", async () => {
	let token = tokenInput.value;
	
	if (token == 'AG_a1...' || token == '')
	{
		tokenInput.style.color='#FF0000';
		tokenParagraf.style.color='red'
		return false;
	}
	else {
		tokenInput.style.color='#000000';
		tokenParagraf.style.color='#000000';
	}
	// получаем доступ к активной вкладке
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	// выполняем скрипт
	
	results = await chrome.scripting.executeScript({
		// скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
		target: { tabId: tab.id },
		// вызываем функцию по получению статуса восстановления
		func: getStateRestoreAll,
		args: [token],
	});
	
	// в консоли расширения ↓
	console.log('results' + JSON.stringify(results));
	//getStateRestoreAllBtn.innerText = JSON.stringify(stateResult[0].result);
});



function getStateRestoreAll(token){
	const myHeaders = new Headers();
	myHeaders.append('X-CSRF-Token', token);
	
	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};
	
	
	fetch("https://cloud.mail.ru/api/v1/necromancer/get_state", requestOptions)
	  .then((response) => 
	  {
		 if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		 return response.json();
	  })
	  .then(result => {
		  // в консоли вкладки ↓
		console.log(JSON.stringify(result, 0 , 2));
		return result;
		}
	  )
	  .catch(error => console.log('error', error));
	   
}