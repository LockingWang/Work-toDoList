// 網頁切換檢查
let pageNow = "logInPage";
let token = "";
let userName = "";
let todolist = [];
const body = document.querySelector(".body");
function checkPage(){
    if(pageNow === "logInPage" && token === ""){
        body.innerHTML = `<div class="logInPage">
        <div class="leftPart">
          <div class="topIcon">
            <img src="./img/Vectorheadicon2.png" alt="box">
            <img src="./img/Vectorheadicon1.png" alt="correctIcon" class="correctIcon">
            <img src="./img/ONLINE TODO LISTlogo.png" alt="headWord">
          </div>
          <div class="downIcon">
            <img src="./img/imgheadimg.png" alt="manWithPen">
          </div>
        </div>
        <div class="rightPart">
          <h2>最實用的線上待辦事項服務</h2>
          <label>
            <p class="word">Email</p>
            <input class="inputBox loginEmail" type="email" placeholder="請輸入Email">
            <p class="homeInputAlert_email">此欄位不可為空白值</p>
          </label>
          <label>
            <p class="word">密碼</p>
            <input class="inputBox loginPassword" type="password" placeholder="請輸入密碼">
            <p class="homeInputAlert_password">此欄位不可為空白值</p>
          </label>
          <div class="btnGroup">
            <input class="logInBtn" type="button" value="登入" />
            <p class="registBtn">註冊帳號</p>
          </div>
        </div>
      </div> 
      <script src="all.js"></script>`
    } else if(pageNow === "registPage" && token === ""){
        body.innerHTML = `<div class="registPage">
        <div class="leftPart">
          <div class="topIcon">
            <img src="./img/Vectorheadicon2.png" alt="box">
            <img src="./img/Vectorheadicon1.png" alt="correctIcon" class="correctIcon">
            <img src="./img/ONLINE TODO LISTlogo.png" alt="headWord">
          </div>
          <div class="downIcon">
            <img src="./img/imgheadimg.png" alt="manWithPen">
          </div>
        </div>
        <div class="rightPart">
          <h2>註冊帳號</h2>
          <label>
            <p class="word">Email</p>
            <input class="inputBox" type="email" placeholder="請輸入Email">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <label>
            <p class="word">您的暱稱</p>
            <input class="inputBox" type="text" placeholder="小明">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <label>
            <p class="word">密碼</p>
            <input class="inputBox" type="password" placeholder="請輸入密碼">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <label>
            <p class="word">再次輸入密碼</p>
            <input class="inputBox" type="password" placeholder="請輸入密碼">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <div class="btnGroup">
            <input class="logInBtn" type="button" value="註冊帳號" />
            <p class="registBtn">登入</p>
          </div>
        </div>
      </div>
      <script src="all.js"></script>`
    } else if(pageNow === "listPage" && token !== ""){
        body.innerHTML = `<div class="listPage_background"></div>
        <div class="header">
          <div class="topIcon">
            <img src="./img/Vectorheadicon2.png" alt="box">
            <img src="./img/Vectorheadicon1.png" alt="correctIcon" class="correctIcon">
            <img src="./img/ONLINE TODO LISTlogo.png" alt="headWord" class="headWord">
          </div>
          <div class="headerBtn">
            <p class="user">${userName}的待辦</p>
            <p class="logOutBtn">登出</p>
          </div>
        </div>
        <div class="listPage">
          <div class="card input">
            <input class="txt" type="text" placeholder="請輸入待辦事項" />
            <a href="#" class="btn_add">+</a>
          </div>
          <div class="card card_list">
            <p>123</p>
          </div>
        </div>
        <script src="all.js"></script>`
    }
};
checkPage();

// 登入功能
let loginEmail = document.querySelector(".loginEmail");
let loginPassword = document.querySelector(".loginPassword");
const logInBtn = document.querySelector(".logInBtn");
const homeInputAlert_email = document.querySelector(".homeInputAlert_email");
const homeInputAlert_password = document.querySelector(".homeInputAlert_password");
const apiUrl = `https://todoo.5xcamp.us`;


function logIn(email,password){
    axios.post(`${apiUrl}/users/sign_in`,{
        "user": {
          "email": email,
          "password": password
        }
    })
    .then(res => {
        alert("登入成功!!!")
        axios.defaults.headers.common['Authorization'] = res.headers.authorization;
        // 此段為使全域的axios都套用上授權的token。
        token = res.headers.authorization;
        pageNow = "listPage";
        userName = res.data.nickname;
        checkPage();
        getTodo();
    })
    .catch(error => {
        alert("帳號或密碼錯誤請重新輸入!");
        loginEmail.value = "";
        loginPassword.value = "";
    })
}

logInBtn.addEventListener("click",function(e){
    if(loginEmail.value == "" || loginPassword.value == ""){
        alert("資料填寫未齊全，請再檢查一次。");
        if(loginEmail.value == ""){
            homeInputAlert_email.classList.add("showRedAlert");
        }else{
            homeInputAlert_email.classList.remove("showRedAlert");
        };
        if(loginPassword.value == ""){
            homeInputAlert_password.classList.add("showRedAlert");
        }else {
            homeInputAlert_password.classList.remove("showRedAlert");
        };
    }else {
        logIn(loginEmail.value,loginPassword.value)
    };
});

// 透過API 取得todolist資料

function getTodo(){
    axios.get(`${apiUrl}/todos`)
    .then(res => {
        todolist = res.data.todos;
        addList();
    })
    .catch(error => console.log(error.response))
};

// todolist頁面的相關JS功能
const list = document.querySelector(".list");
let tabPage = "all";


function addList(){
    const card_list = document.querySelector(".card_list");
    let str = "";
    let count = 0;
    todolist.forEach(function(item){
        if (tabPage == "all"){
            if(item.completed_at == null){
                str += `<li>
                <label class="checkbox" for="">
                <input type="checkbox" data-id="${item.id}" data-completed_at=${item.completed_at} />
                <span>${item.content}</span>
                </label>
                <a href="#" class="delete" data-id="${item.id}"></a>
                </li>`;
            } else {
                str += `<li>
                <label class="checkbox checkbox_done" for="">
                <input type="checkbox" data-id="${item.id}" data-completed_at=${item.completed_at} />
                <span>${item.content}</span>
                </label>
                <a href="#" class="delete" data-id="${item.id}"></a>
                </li>`;
            }
        } else if (tabPage == "undo" && item.completed_at == null){
            str += `<li>
            <label class="checkbox" for="">
            <input type="checkbox" data-id="${item.id}" data-completed_at=${item.completed_at} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-id="${item.id}"></a>
            </li>`;
        } else if (tabPage == "done" && item.completed_at != null){
            str += `<li>
            <label class="checkbox checkbox_done" for="">
            <input type="checkbox" data-id="${item.id}" data-completed_at=${item.completed_at} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-id="${item.id}"></a>
            </li>`;
        };
        if (item.completed_at == null) {
            count ++;
        };
    });
    if (tabPage == "all"){
        card_list.innerHTML = `
        <ul class="tab">
            <li class="active" data-tab="all">全部</li>
            <li data-tab="undo">待完成</li>
            <li data-tab="done">已完成</li>
        </ul>
        <div class="cart_content">
            <ul class="list">
                ${str}
            </ul>
            <div class="list_footer">
                <p>有 ${count} 個待完成項目</p>
                <a href="#" class="clear">清除已完成項目</a>
            </div>
        </div>`;
    } else if (tabPage == "undo"){
        card_list.innerHTML = `<ul class="tab">
        <li data-tab="all">全部</li>
        <li class="active" data-tab="undo">待完成</li>
        <li data-tab="done">已完成</li>
        </ul>
        <div class="cart_content">
        <ul class="list">
        ${str}
        </ul>
        <div class="list_footer">
        <p>還有 ${count} 個待完成項目</p>
        <a href="#" class="clear">清除已完成項目</a>
        </div>
        </div>`;
    } else if (tabPage == "done"){
        card_list.innerHTML = `<ul class="tab">
        <li data-tab="all">全部</li>
        <li data-tab="undo">待完成</li>
        <li class="active" data-tab="done">已完成</li>
        </ul>
        <div class="cart_content">
        <ul class="list">
        ${str}
        </ul>
        <div class="list_footer">
        <p>尚有 ${count} 個待完成項目</p>
        <a href="#" class="clear">清除已完成項目</a>
        </div>
        </div>`;
    };
};
// 添加待辦功能

body.addEventListener("click",function(e){
    const txt = document.querySelector(".txt");
    if (e.target.getAttribute("class") == "btn_add"){
        if (txt.value.trim() == ""){
            alert("請輸入待辦事項!");
            return;
        }
        axios.post(`${apiUrl}/todos`,{
            "todo": {
              "content": txt.value.trim()
            }
        })
        .then(res => {
            tabPage = "all";
            getTodo();
            txt.value = "";
            alert("新增成功!");
        })
        .catch(error => console.log(error.response))
    };
});//滑鼠新增

body.addEventListener("keyup",function(e){
    const txt = document.querySelector(".txt");
    if( e.key === "Enter"){
        if(txt.value.trim() == ""){
            alert("請輸入待辦事項!");
            return;
        }
        axios.post(`${apiUrl}/todos`,{
            "todo": {
              "content": txt.value.trim()
            }
        })
        .then(res => {
            tabPage = "all";
            getTodo();
            txt.value = "";
            alert("新增成功!");
        })
        .catch(error => console.log(error.response))
    }else {
        return;
    }
});//Enter新增



// 刪除待辦功能

body.addEventListener("click",function(e){
    if (e.target.getAttribute("class") !== "delete"){
        return;
    }
    axios.delete(`${apiUrl}/todos/${e.target.dataset.id}`)
    .then(res => {
        getTodo();
        alert("刪除成功!");
    })
    .catch(error => console.log(error.response))
});

// checkbox點選標記
//因為checkbox本身沒有value值可供篩選，所以要自己新增屬性

body.addEventListener("click",function(e){
    if (e.target.nodeName !== "INPUT"){
        return;
    };
    axios.patch(`${apiUrl}/todos/${e.target.dataset.id}/toggle`,{})
    .then(res => getTodo())
    .catch(error => console.log(error.response))
});

//tab 轉換頁面功能

body.addEventListener("click",function(e){
    if(e.target.dataset.tab !== "all" && e.target.dataset.tab !== "undo" && e.target.dataset.tab !== "done"){
        return;
    }else{
        tabPage = e.target.dataset.tab;
        getTodo();
    };
});


// 清除已完成項目

card_list.addEventListener("click",function(e){
    const clear = document.querySelector(".clear");
    if (e.target.getAttribute("class") !== "clear") {
        return;
    };
    let undoData = data.filter(function(item){
        return item.checked == "";
    });
    data = undoData;
    addList();
});