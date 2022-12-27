// 網頁切換內容
let pageNow = "logInPage";

function checkPage(){
    if(pageNow === "logInPage"){
        body.innerHTML = `    <div class="logInPage">
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
            <input class="inputBox" type="email" placeholder="請輸入Email">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <label>
            <p class="word">密碼</p>
            <input class="inputBox" type="password" placeholder="請輸入密碼">
            <p class="homeInputAlert">此欄位不可為空白值</p>
          </label>
          <div class="btnGroup">
            <input class="logInBtn" type="button" value="登入" />
            <p class="registBtn">註冊帳號</p>
          </div>
        </div>
      </div>
      <script src="all.js"></script>`
    }
};

// 要有ID才能轉換到個人的todolist
let token = "";
const body = document.querySelector(".body");
function checkID (){
    if (token !== ""){
        body.innerHTML = `<div class="listPage_background"></div>
        <div class="listPage">
          <h1>TODO LIST</h1>
            <div class="card input">
              <input class="txt" type="text" placeholder="請輸入待辦事項" />
              <a href="#" class="btn_add">+</a>
            </div>
            <div class="card card_list">
              
            </div>
        </div>
        <script src="all.js"></script>`
    }
};
// 變數專區
const list = document.querySelector(".list");
const card_list = document.querySelector(".card_list");
let data = [];
let tabPage = "all";

function addList(){
    let str = "";
    let count = 0;
    data.forEach(function(item,index){
        if (tabPage == "all"){
            str += `<li>
            <label class="checkbox" for="">
            <input type="checkbox" data-num="${index}" ${item.checked} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        } else if (tabPage == "undo" && item.checked == ""){
            str += `<li>
            <label class="checkbox" for="">
            <input type="checkbox" data-num="${index}" ${item.checked} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        } else if (tabPage == "done" && item.checked == "checked"){
            str += `<li>
            <label class="checkbox" for="">
            <input type="checkbox" data-num="${index}" ${item.checked} />
            <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        };
        if (item.checked == "") {
            count ++;
        };
    });
    if (tabPage == "all"){
        card_list.innerHTML = `<ul class="tab">
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
const cardInput = document.querySelector(".input");
const txt = document.querySelector(".txt");

cardInput.addEventListener("click",function(e){
    if (e.target.getAttribute("class") == "btn_add"){
        if (txt.value.trim() == ""){
            alert("請輸入待辦事項!");
            return;
        }
        let obj = {};
        obj.content = txt.value.trim();
        obj.checked = "";
        data.push(obj);
        tabPage = "all";
        addList();
        txt.value = "";
    };
});//滑鼠新增

cardInput.addEventListener("keyup",function(e){
    if( e.key === "Enter"){
        if(txt.value.trim() == ""){
            alert("請輸入待辦事項!");
            return;
        }else if(e.key == "Enter"){
            let obj = {};
            obj.content = txt.value.trim();
            obj.checked = "";
            data.push(obj);
            tabPage = "all";
            addList();
            txt.value = "";
        }
    }else {
        return;
    }
});//Enter新增



// 刪除待辦功能

card_list.addEventListener("click",function(e){
    if (e.target.getAttribute("class") !== "delete"){
        return;
    }
    let num = e.target.getAttribute("data-num")
    data.splice(num,1);
    addList();
    alert("刪除成功!");
});

// checkbox點選標記
//因為checkbox本身沒有value值可供篩選，所以要自己新增屬性

card_list.addEventListener("click",function(e){
    if (e.target.nodeName !== "INPUT"){
        return;
    };
    let num = e.target.dataset.num;
    if(data[num].checked === "checked"){
        data[num].checked = "";
    }else if (data[num].checked !== "checked"){
        data[num].checked = "checked";
    }
    addList();
});

//tab 轉換頁面功能

card_list.addEventListener("click",function(e){
    if(e.target.dataset.tab !== "all" && e.target.dataset.tab !== "undo" && e.target.dataset.tab !== "done"){
        return;
    }else{
        tabPage = e.target.dataset.tab;
        addList();
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