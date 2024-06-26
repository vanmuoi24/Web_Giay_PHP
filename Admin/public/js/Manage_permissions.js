function Manage_permissions() {
  const Mange_client = document.getElementsByClassName("Mange_client")[0];

  let Manage_permissions = `
                    <div class="update_quyen"></div>
                        
                        <div class="Manage_permissions">
                        <div class="group_posi">
                            <div>
                                <h3>Quản lí nhóm quyền</h2>
                            </div>
                        </div>
                        <div style="display:flex" class="group_btn">
                            <input type="text" name="" id="namequyen">
                            <Button onclick="handleadd_posi()">Thêm Mới <i class="fa-solid fa-plus"></i> </Button>
                        </div>
                        <div class="quyen">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã nhóm quyền</th>
                                        <th>Tên nhóm</th>
                                        <th>Số người dùng</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="container_add_posi" style="display: none">
                   
                   
                        <div class="add_header">
                            <h2>Thêm nhóm quyền</h2>
                            <p><i class="fa-solid fa-circle-xmark" onclick="handlecloss()"></i></p>
                        </div>
        
                        <hr>
                   
                            <div class="form-group">
                                <label for="ten-nhom-quyen">Tên nhóm quyền:</label>
                                <input type="text" id="ten-nhom-quyen" name="ten-nhom-quyen" placeholder="Vd : Quản Trị Viên">
                            </div>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Tên quyền</th>
                                        <th>Xem</th>
                                        <th>Thêm mới</th>
                                        <th>Cập nhật</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="form-group">
                                <button class="btn btn-primary" onclick="handlesavequyen()">Lưu</button>
                                <button  class="btn btn-secondary" onclick="handlecloss()" >Huỷ</button>
                            </div>
                     
                    </div>
                    <div id="notifications"></div>
                    <div id="toast"></div>
                        `;
  Mange_client.innerHTML = Manage_permissions;
  listManage_posiion();
}

function Notify(text, callback, close_callback, style) {
  var time = 3000;
  var $container = $("#notifications");
  var icon = '<i class="fa fa-info-circle "></i>';
  var backgroundColor;
  if (typeof style == "undefined") style = "warning";

  if (style === "success") {
    backgroundColor = "#28a745";
  } else if (style === "danger") {
    backgroundColor = "#dc3545";
  } else {
    backgroundColor = "#ffc107";
  }

  var html = $(
    '<div class="alert alert-' +
      style +
      '  hide">' +
      icon +
      " " +
      text +
      "</div>"
  ).css("background-color", backgroundColor);

  $("<a>", {
    text: "X",
    class: "button close",
    style: "padding-left: 10px;",
    href: "#",
    click: function (e) {
      e.preventDefault();
      close_callback && close_callback();
      remove_notice();
    },
  }).prependTo(html);

  $container.prepend(html);
  html.removeClass("hide").hide().fadeIn("slow");

  function remove_notice() {
    html.stop().fadeOut("slow").remove();
  }

  var timer = setInterval(remove_notice, time);

  $(html).hover(
    function () {
      clearInterval(timer);
    },
    function () {
      timer = setInterval(remove_notice, time);
    }
  );

  html.on("click", function () {
    clearInterval(timer);
    callback && callback();
    remove_notice();
  });
}

function cityop() {
  let poss = document.querySelectorAll(
    ".header ,.header_content,.Manage_permissions"
  );
  poss.forEach((poss) => {
    poss.style.opacity = "0.2";
    poss.style.pointerEvents = "none";
  });
}
function cityopmove() {
  let poss = document.querySelectorAll(
    ".header ,.header_content,.Manage_permissions"
  );
  poss.forEach((poss) => {
    poss.style.opacity = "1";
    poss.style.pointerEvents = "auto";
  });
}
function handlecloss() {
  const container_add_posi =
    document.getElementsByClassName("container_add_posi")[0];
  const update_quyen = document.getElementsByClassName("update_quyen")[0];
  update_quyen.innerHTML = "";
  console.log(container_add_posi);
  container_add_posi.style.display = "none";

  cityopmove();
}

function listManage_posiion() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../mvc/API/index.php?type=dsnhomquyen", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      listquyen(response);

      let namequyen = document.getElementById("namequyen");
      namequyen.addEventListener("input", function () {
        let keyword = namequyen.value.trim().toUpperCase(); // Chuyển thành chữ hoa
        const filteredData = response.filter((item, index) => {
          return item.tennhomquyen.toUpperCase().includes(keyword);
        });
        listquyen(filteredData);
      });
    }
  };
  xhr.send();
}

function listquyen(response) {
  const quyen = document.querySelectorAll(".quyen table tbody")[0];
  let table = "";
  response.map((item, index) => {
    table += `
        <tr>
          <td>${item.manhomquyen}</td>
          <td>${item.tennhomquyen}</td>
          <td>2</td>
          <td>
              <button onclick = "handleedit('${item.manhomquyen}')"><i class="fa-solid fa-pen" ></i></button>
          </td>
      </tr>

      `;
    quyen.innerHTML = table;
  });
}

function handleadd_posi() {
  const container_add_posi =
    document.getElementsByClassName("container_add_posi")[0];
  container_add_posi.style.display = "block";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../../mvc/API/index.php?type=dsaddquyen", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      const table = document.querySelectorAll(".table tbody")[0];
      let tbody = "";
      response.map((item, index) => {
        tbody += `
        <tr>
        <td>${item.ten_chuc_nang}</td>
        <td><input type="checkbox" name="quyen[]" value="${item.ma_chuc_nang}_xem"></td>
        <td><input type="checkbox" name="quyen[]" value="${item.ma_chuc_nang}_them"></td>
        <td><input type="checkbox" name="quyen[]" value="${item.ma_chuc_nang}_sua"></td>
        <td><input type="checkbox" name="quyen[]" value="${item.ma_chuc_nang}_xoa"></td>
      </tr>
        `;
        table.innerHTML = tbody;
      });
    }
  };
  xhr.send();
  cityop();
}
function handleedit(id) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "../../mvc/API/index.php?type=dseditnhomquyen&id=" + id,
    true
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(JSON.parse(response));
      displayQuyen(JSON.parse(response));
    }
  };

  xhr.send();
}
function displayQuyen(quyenData) {
  let data = quyenData.data;

  const update_quyen = document.getElementsByClassName("update_quyen")[0];
  let updatequyen = `
  <div class="container_add_posi" >
  <div class="add_header">
      <h2>Sửa Nhóm Quyền</h2>
      <p><i class="fa-solid fa-circle-xmark" onclick="handlecloss()"></i></p>
  </div>

  <hr>
 
      <div class="form-group">
          <label for="ten-nhom-quyen">Tên nhóm quyền:</label>
          <input type="text" id="ten-nhom-quyen" name="ten-nhom-quyen" value ="${quyenData.tenquyen}">
      </div>
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th>Tên quyền</th>
                  <th>Xem</th>
                  <th>Thêm mới</th>
                  <th>Cập nhật</th>
                  <th>Xoá</th>
              </tr>
          </thead>
          <tbody>
          </tbody>
      </table>
      <div class="form-group">
          <button class="btn btn-primary" onclick="handleupodata('${quyenData.id}')"> Cập Nhật</button>
          <button  class="btn btn-secondary">Huỷ</button>
      </div>

</div>
  `;
  update_quyen.innerHTML = updatequyen;

  cityop();
  const quyen = document.querySelectorAll(".table-bordered tbody")[0];
  console.log(quyen);
  console.log(data);
  let quyenActions = {};
  data.forEach((quyen) => {
    if (!quyenActions[quyen.ten_chuc_nang]) {
      quyenActions[quyen.ten_chuc_nang] = {
        xem: { checked: false, maChucNang: quyen.ma_chuc_nang },
        them: { checked: false, maChucNang: quyen.ma_chuc_nang },
        sua: { checked: false, maChucNang: quyen.ma_chuc_nang },
        xoa: { checked: false, maChucNang: quyen.ma_chuc_nang },
      };
    }

    switch (quyen.hanh_dong) {
      case "xem":
        quyenActions[quyen.ten_chuc_nang].xem = {
          checked: true,
          maChucNang: quyen.ma_chuc_nang,
        };
        break;
      case "them":
        quyenActions[quyen.ten_chuc_nang].them = {
          checked: true,
          maChucNang: quyen.ma_chuc_nang,
        };
        break;
      case "sua":
        quyenActions[quyen.ten_chuc_nang].sua = {
          checked: true,
          maChucNang: quyen.ma_chuc_nang,
        };
        break;
      case "xoa":
        quyenActions[quyen.ten_chuc_nang].xoa = {
          checked: true,
          maChucNang: quyen.ma_chuc_nang,
        };
        break;
      default:
        break;
    }
  });

  let tableHTML = "";
  Object.keys(quyenActions).forEach((ten_quyen) => {
    console.log(quyenActions[ten_quyen]);
    tableHTML += `
    <tr>
      <td>${ten_quyen}</td>
      <td><input type="checkbox" name="quyen[]" ${
        quyenActions[ten_quyen].xem.checked ? "checked" : ""
      } value="${quyenActions[ten_quyen].xem.maChucNang}_xem"></td>
      <td><input type="checkbox" name="quyen[]" ${
        quyenActions[ten_quyen].them.checked ? "checked" : ""
      } value="${quyenActions[ten_quyen].them.maChucNang}_them"></td>
      <td><input type="checkbox" name="quyen[]" ${
        quyenActions[ten_quyen].sua.checked ? "checked" : ""
      } value="${quyenActions[ten_quyen].sua.maChucNang}_sua"></td>
      <td><input type="checkbox" name="quyen[]" ${
        quyenActions[ten_quyen].xoa.checked ? "checked" : ""
      } value="${quyenActions[ten_quyen].xoa.maChucNang}_xoa"></td>
    </tr>`;
  });

  quyen.innerHTML = tableHTML;
  if (quyenData.length > 0) {
    const tenNhomQuyenInput = document.getElementById("ten-nhom-quyen");
    tenNhomQuyenInput.value = quyenData[0].ten_nhom_quyen;
  }
}
function handlesavequyen() {
  const tenNhomQuyenInput = document.getElementById("ten-nhom-quyen");
  const checkboxes = document.querySelectorAll('input[name="quyen[]"]');
  let selectedQuyen = {
    tennhomquyen: tenNhomQuyenInput.value,
    selecquyen: [],
  };

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const [maChucNang, hanhDong] = checkbox.value.split("_");
      selectedQuyen.selecquyen.push({ maChucNang, hanhDong });
    }
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../../mvc/API/index.php?type=luuquyen", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
    }
  };

  if (validateForm() == true) {
    const container_add_posi =
      document.getElementsByClassName("container_add_posi")[0];
    const update_quyen = document.getElementsByClassName("update_quyen")[0];
    update_quyen.innerHTML = "";
    container_add_posi.style.display = "none";

    toast({
      title: "Thành Công",
      message: "Thêm Thành Công",
      type: "success",
      duration: 3000,
    });

    xhr.send(JSON.stringify(selectedQuyen));
    listManage_posiion();
    cityopmove();
  }
}
function validateForm() {
  const tenNhomQuyenInput = document.getElementById("ten-nhom-quyen");
  console.log(tenNhomQuyenInput);
  const checkboxes = document.querySelectorAll('input[name="quyen[]"]');
  let quyenSelected = false;

  if (tenNhomQuyenInput.value === "") {
    console.log("ok");
    toast({
      title: "Tên Quyền",
      message: "Vui Lòng Nhập Tên Quyền",
      type: "error",
      duration: 3000,
    });
    return false;
  }

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      quyenSelected = true;
    }
  });

  if (!quyenSelected) {
    toast({
      title: "Chức Năng",
      message: "Vui Lòng Chọn Ít Nhất 1 Chức Năng",
      type: "warning",
      duration: 3000,
    });
    return false;
  }

  return true;
}

function handleupodata(id) {
  const tenNhomQuyenInput = document.getElementById("ten-nhom-quyen");
  const checkboxes = document.querySelectorAll('input[name="quyen[]"]:checked');
  let selectedQuyen = {
    tennhomquyen: tenNhomQuyenInput.value,
    selecquyen: [],
    id: id,
  };

  checkboxes.forEach((checkbox) => {
    const [maChucNang, hanhDong] = checkbox.value.split("_");
    selectedQuyen.selecquyen.push({ maChucNang, hanhDong });
  });
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../../mvc/API/index.php?type=updatequyen", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      let res = JSON.parse(JSON.parse(response));
    }
  };
  if (validateForm() == true) {
    console.log(selectedQuyen);

    const container_add_posi =
      document.getElementsByClassName("container_add_posi")[0];
    const update_quyen = document.getElementsByClassName("update_quyen")[0];
    update_quyen.innerHTML = "";
    container_add_posi.style.display = "none";
    toast({
      title: "Thành Công",
      message: "Cập Nhật Thành Công",
      type: "success",
      duration: 3000,
    });
    listManage_posiion();
    cityopmove();
    xhr.send(JSON.stringify(selectedQuyen));
  }
}

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.querySelector("#toast");
  if (main) {
    const toast = document.createElement("div");
    const autoRmId = setTimeout(() => {
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRmId);
      }
    };
    const icons = {
      success: "fa fa-check-circle",
      error: "fa fa-warning",
      warning: "fa fa-exclamation-circle",
      info: "fa fa-info-circle",
    };

    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = ` slideInLeft linear 0.3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times-circle"></i>
            </div>
        `;
    main.appendChild(toast);
  }
}
