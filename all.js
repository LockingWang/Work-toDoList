// 待辦資料庫
const list = document.querySelector(".list");
const card_list = document.querySelector(".card_list");
let todolist = [
    {
        txt: "寫作業"
    },
    {
        txt: "喝水"
    }
];

function addList(){
    let str = "";
    todolist.forEach(function(item,index){
        str += `<li>
        <label class="checkbox" for="">
          <input type="checkbox" />
          <span>${item.txt}</span>
        </label>
        <a href="#" class="delete" data-num="${index}"></a>
        </li>`;
    });
    card_list.innerHTML = `<ul class="tab">
    <li class="active">全部</li>
    <li>待完成</li>
    <li>已完成</li>
    </ul>
    <div class="cart_content">
    <ul class="list">
      ${str}
    </ul>
    <div class="list_footer">
      <p>5 個待完成項目</p>
      <a href="#">清除已完成項目</a>
    </div>
    </div>`;
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
        todolist.push({"txt":txt.value});
        txt.value = "";
        addList();
    };
});

// 刪除待辦功能

card_list.addEventListener("click",function(e){
    if (e.target.getAttribute("class") !== "delete"){
        return;
    }
    let num = e.target.getAttribute("data-num")
    todolist.splice(num,1);
    addList();
    alert("刪除成功!");
});