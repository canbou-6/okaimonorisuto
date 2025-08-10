// HTML要素を取得
const addItemForm = document.getElementById("addItemForm");
const itemInput = document.getElementById("itemInput");
const shoppingList = document.getElementById("shoppingList");
const clearButton = document.getElementById("ClearButton");

// ページの読み込み時にローカルストレージからリストを復元
document.addEventListener("DOMContentLoaded", function() {
    loadItemsFromLocalStorage();
});

// アイテムの追加・削除・完了状態の変更を処理する関数
function createItemElement(itemText, isCompleted = false) {
    // 新しいリストアイテムを作成
    const listItem = document.createElement("li");
    
    // アイテムのテキスト部分と削除ボタンを作成
    const itemTextSpan = document.createElement("span");
    itemTextSpan.textContent = itemText;
    itemTextSpan.classList.add("item-text");

    // 完了状態に応じてクラスを付与
    if (isCompleted) {
        itemTextSpan.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.classList.add("delete-btn");

    // リストアイテムにテキストとボタンを追加
    listItem.appendChild(itemTextSpan);
    listItem.appendChild(deleteButton);

    // 完了/未完了の切り替えイベント
    itemTextSpan.addEventListener("click", function() {
        itemTextSpan.classList.toggle("completed");
        saveItemsToLocalStorage(); // 変更後に保存
    });

    // 削除ボタンのクリックイベント
    deleteButton.addEventListener("click", function() {
        listItem.remove();
        saveItemsToLocalStorage(); // 削除後に保存
    });

    return listItem;
}

// アイテム追加の処理
addItemForm.addEventListener("submit", function(event) {
    event.preventDefault(); // フォーム送信によるページのリロードを防ぐ

    const newItemText = itemInput.value.trim(); // 入力されたテキストの取得

    if (newItemText !== '') { // 空のアイテムは追加しない
        const listItem = createItemElement(newItemText);
        shoppingList.appendChild(listItem);
        
        // 入力フォームをクリア
        itemInput.value = '';

        // ローカルストレージに保存
        saveItemsToLocalStorage();
    }
});

// アイテム全削除の処理
clearButton.addEventListener("click", function(event) {
    event.preventDefault(); // フォーム送信によるページのリロードを防ぐ

    // shoppingListの子要素をすべて削除する
    shoppingList.innerHTML = '';

    // 全削除後にローカルストレージもクリア
    localStorage.removeItem("shoppingListItems");
});
  
// ローカルストレージにリストを保存する関数
function saveItemsToLocalStorage() {
    const items = [];
    shoppingList.querySelectorAll("li").forEach(listItem => {
        const itemText = listItem.querySelector(".item-text").textContent;
        const isCompleted = listItem.querySelector(".item-text").classList.contains("completed");
        items.push({ text: itemText, completed: isCompleted });
    });
    // 配列をJSON文字列に変換して保存
    localStorage.setItem("shoppingListItems", JSON.stringify(items));
}

// ローカルストレージからリストを読み込む関数
function loadItemsFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("shoppingListItems"));
    
    if (items) {
        items.forEach(item => {
            const listItem = createItemElement(item.text, item.completed);
            shoppingList.appendChild(listItem);
        });
    }
}

