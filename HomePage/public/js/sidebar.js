function loadSidebar() {
	const sblistColor = document.querySelector('.psc-list');
	const sblistMaterial = document.querySelector('.psm-list');
	const sblistType = document.querySelector('.pst-list');
	const sblistSize = document.querySelector('.pss-select');
	//
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '../../mvc/API/index.php?type=sidebarHome', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let dataSidebar = JSON.parse(xhr.responseText);
			console.log('dataSidebar: ', dataSidebar);
			//type
			let htmls = '';
			dataSidebar.type.map((item) => {
				htmls += `
				<option class="pst-opt" value="${item.id}">${item.name}</option>
				`;
			});
			sblistType.innerHTML += htmls;
			//material
			htmls = '';
			dataSidebar.material.map((item) => {
				htmls += `
					<li class="psm-item">
						<a onclick="showProductByMaterial(this, \'${item.name}\')" class="psm-link">${item.name}</a>
					</li>
				`;
			});
			sblistMaterial.innerHTML = htmls;
			//color
			htmls = '';
			dataSidebar.color.map((item) => {
				htmls += `
					<li class="psc-item">
						<a onclick="showProductByColor(this)" data-id=${item.id} class="psc-link">Màu ${item.name}</a>
					</li>
				
				`;
			});
			sblistColor.innerHTML = htmls;
			//size
			htmls = '';
			dataSidebar.size.map((item) => {
				htmls += `
					<option class="pss-opt" value="${item.id}">${item.name}</option>
				`;
			});
			sblistSize.innerHTML += htmls;
		}
	};

	xhr.send();
}
function sidebarHomeHtml() {
	return `
						<div class="product-sidebar">
                     <div class="ps-collection">
                        <h2 style="display:inline-block">LOẠI</h2>
                        <div class="pst-content" style="display:inline-block">
									<select class="pst-list" onchange="showProductByType(this)">
                              <option class="pst-opt" value="default">--</option>
                           </select>
                        </div>
                     </div>
                     <div class="--separate-line"></div>
                     <div class="ps-material">
                        <h2>CHẤT LIỆU</h2>
                        <div class="psm-content">
                           <ul class="psm-list">
                           </ul>
                        </div>
                     </div>
                     <div class="--separate-line"></div>
                     <div class="ps-color">
                        <h2>MÀU SẮC</h2>
                        <div class="psc-content">
                           <ul class="psc-list">
                           </ul>
                        </div>
                     </div>
                     <div class="--separate-line"></div>
                     <div class="ps-size">
                        <h2>SIZE</h2>
                        <div class="pss-content">
                           <select class="pss-select" onchange="showProductBySize(this)">
                              <option class="pss-opt" value="default">--</option>
                           </select>
                        </div>
                     </div>
                     <div class="--separate-line"></div>

                     <div class="ps-price">
                        <h2>KHOẢNG GIÁ</h2>
                        <div class="psp-content">
                           <div id="form-filter-price" class="psp-form">
                              <div class="psp-form-group">
                                 <span>Từ</span>
                                 <input type="number" name="from-price" id="from-price" class="psp-from-price">
                                 <span>-</span>
                                 <input type="number" name="to-price" id="to-price" class="psp-to-price">
                              </div>
                              <p class="ps-price-error"></p>
                              <button id="submit-price" onclick="showProductByPrice()" class="psp-submit-price">
                                 Lọc giá
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
	`;
}
function loadSidebarResponsive() {
	const sblistColor = document.querySelector('.psc-list.active');
	const sblistMaterial = document.querySelector('.psm-list.active');
	const sblistType = document.querySelector('.pst-list.active');
	const sblistSize = document.querySelector('.pss-select.active');
	//
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '../../mvc/API/index.php?type=sidebarHome', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let dataSidebar = JSON.parse(xhr.responseText);
			console.log('dataSidebar: ', dataSidebar);
			//type
			let htmls = '';
			dataSidebar.type.map((item) => {
				htmls += `
				<option class="pst-opt" value="${item.id}">${item.name}</option>
				`;
			});
			sblistType.innerHTML += htmls;
			//material
			htmls = '';
			dataSidebar.material.map((item) => {
				htmls += `
					<li class="psm-item">
						<a onclick="showProductByMaterial(this, \'${item.name}\')" class="psm-link">${item.name}</a>
					</li>
				`;
			});
			sblistMaterial.innerHTML = htmls;
			//color
			htmls = '';
			dataSidebar.color.map((item) => {
				htmls += `
					<li class="psc-item">
						<a onclick="showProductByColor(this)" data-id=${item.id} class="psc-link">Màu ${item.name}</a>
					</li>
				
				`;
			});
			sblistColor.innerHTML = htmls;
			//size
			htmls = '';
			dataSidebar.size.map((item) => {
				htmls += `
					<option class="pss-opt" value="${item.id}">${item.name}</option>
				`;
			});
			sblistSize.innerHTML += htmls;
		}
	};

	xhr.send();
}
