//HTML要素を取得する
const addItemFrom = document.getElementById("addItemForm");
const itemInput = document.getElementById("itemInput");
const shoppingList = document.getElementById("shoppingList");
const ClearButton = document.getElementById("ClearButton");

//アイテム追加の処理

addItemFrom.addEventListener("click",function(event){
   event.preventDefault();//フォーム送信によるページのリロードを防ぐ

   const newItemText = itemInput.value.trim();//入力されたテキストの取得

      if(newItemText !== '') {//からのアイテムは追加しない
      //新しいアイテムリストを作成
      const listItem = document.createElement("li");



      //アイテムのテキスト部分と削除ボタンを作成
      const itemTextSpan = document.createElement("span");
      itemTextSpan.textContent = newItemText;
      itemTextSpan.classList.add("item-text");

      const deleteButton = document.createElement("button");
      deleteButton.textContent ="削除";
      deleteButton.classList.add("delete-btn");

     //リストアイテムにテキストボタンを追加
      listItem.appendChild(itemTextSpan);
      listItem.appendChild(deleteButton);

          
      //リストに新しいアイテムを追加
      shoppingList.appendChild(listItem);

      //入力フォームをクリア
      itemInput.value = '';

      //アイテムのクリックイベントを追加(完了/未完了の切り替え)
      itemTextSpan.addEventListener("click",function(){
         itemTextSpan.classList.toggle("completed");
    
        });

        //削除ボタンのクリックイベントの追加
          deleteButton.addEventListener("click",function(){
          listItem.remove();
        });

    
    //アイテム全削除の処理
    ClearButton.addEventListener("click",function(event){
    event.preventDefault();//フォーム送信によるページのリロードを防ぐ
    //最初の子要素がいる限りループを続ける
    while (shoppingList.firstChild){
    //最初の子要素を削除
    shoppingList.removeChild(shoppingList.firstChild);
    }
    });

    }  


});
