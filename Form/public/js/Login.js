document.getElementById('login').addEventListener('click', () => {
	if (!Validate_Login()) return;
	var usernameValue = document.getElementById('username').value;
	var passwordValue = document.getElementById('password').value;

	let data = {
		usernameValue: usernameValue,
		passwordValue: passwordValue,
	};

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '../../MVC/API/index.php?type=dangnhap', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);

			console.log(response);
			if (response.EC == '1') {
				sessionStorage.setItem('username', JSON.stringify(response.DT));
				if (response.DT.nhomquyen == '1') {
					location.href = '../../../Admin/mvc/view/index.php';
				}
				if (response.DT.nhomquyen == '24') {
					location.href = '../../../HomePage/mvc/view/index.php';
				}
				alert('Đăng nhập thành công');
			} else {
				alert('Đăng nhập thất bại');
			}
		}
	};

	xhr.send(JSON.stringify(data));
});

function Validate_Login() {
	var username = document.querySelector('#username').value.trim();
	var password = document.querySelector('#password').value.trim();

	var username_error = document.querySelector('.username--error');
	var password_error = document.querySelector('.password--error');

	username_error.textContent = '';
	password_error.textContent = '';
	var isValid = true;
	if (username === '') {
		username_error.textContent = 'Vui lòng nhập tên đăng nhập';
		isValid = false;
	}
	if (password === '') {
		password_error.textContent = 'Vui lòng nhập mật khẩu';
		isValid = false;
	}
	return isValid;
}
document.getElementById('backpage').addEventListener('click', () => {
	location.href = '../../../HomePage/mvc/view/index.php';
});
