var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var deleteBtn;
var closeBtn = document.getElementById("closeBtn");
var bookmarkList = [];
var regexName = /^\w{3,}(\s+\w+)*$/;
var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

if (localStorage.getItem("bookmarkList") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  displayBookmark(bookmarkList);
}

function addBookmark() {
  if (checkSiteName() && checkSiteUrl()) {
    var bookmark = {
      siteName: siteName.value,
      siteUrl: siteUrl.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    console.log(bookmarkList);
  }
}

submitBtn.addEventListener("click", function () {
  addBookmark();
  displayBookmark(bookmarkList);
  clear();
});

function displayBookmark(list) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `              <tr>
    <td>${i + 1}</td>
    <td>${list[i].siteName}</td>
    <td>
    <a
    href="https://${list[i].siteUrl}/"
    target="_blank"
    ><button class="btn visitBtn">
      <i class="fa-regular fa-eye"></i> Visit
    </button></a
  >
    </td>
    <td>
      <button onClick="deleteBookmark(${i})" class="btn deleteBtn">
        <i class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("tableContent").innerHTML = box;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);

  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  displayBookmark(bookmarkList);
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function closeBox() {
  document.querySelector(".box-info").classList.replace("d-block", "d-none");
}

closeBtn.addEventListener("click", closeBox);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeBox();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeBox();
  }
});

function checkSiteName() {
  var regex = /^\w{3,}(\s+\w+)*$/gm;
  var isValid = regex.test(siteName.value);
  if (isValid) {
    document.querySelector(".box-info").classList.replace("d-block", "d-none");
  } else {
    document.querySelector(".box-info").classList.replace("d-none", "d-block");
  }
  return isValid;
}

function checkSiteUrl() {
  var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  var isValid = regex.test(siteUrl.value);
  if (isValid) {
    document.querySelector(".box-info").classList.replace("d-block", "d-none");
  } else {
    document.querySelector(".box-info").classList.replace("d-none", "d-block");
  }
  return isValid;
}

siteName.addEventListener("input", function () {
  if (regexName.test(siteName.value)) {
    siteName.classList.add("green");
    siteName.classList.remove("red");
  } else {
    siteName.classList.add("red");
    siteName.classList.remove("green");
  }
});

siteUrl.addEventListener("input", function () {
  if (regexUrl.test(siteUrl.value)) {
    siteUrl.classList.add("green");
    siteUrl.classList.remove("red");
  } else {
    siteUrl.classList.add("red");
    siteUrl.classList.remove("green");
  }
});
