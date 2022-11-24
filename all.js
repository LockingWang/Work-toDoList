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
        if (txt.value == ""){
            alert("請輸入待辦事項!");
            return;
        }
        let obj = {};
        obj.content = txt.value;
        obj.checked = "";
        data.push(obj);
        addList();
        txt.value = "";
    };
});//滑鼠新增

cardInput.addEventListener("keyup",function(e){
    if(txt.value == ""){
        alert("請輸入待辦事項!");
        return;
    }else if(e.key == "Enter"){
        let obj = {};
        obj.content = txt.value;
        obj.checked = "";
        data.push(obj);
        addList();
        txt.value = "";
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
        console.log("無效");
        return;
    };
    let undoData = data.filter(function(item){
        return item.checked == "";
    });
    data = undoData;
    addList();
});