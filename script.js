function expenseform(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const catagory = event.target.catagory.value;

    const expenseobj = {
        amount,
        description,
        catagory
    }
    localStorage.setItem(expenseobj.description,JSON.stringify(expenseobj))
    
    showUserOnScreen(expenseobj)
}
window.addEventListener("DOMContentLoaded",() => {
    const localStorageObj = localStorage;
    const localStorageObjKeys = Object.keys(localStorageObj)
    for(var i=0; i<localStorageObjKeys.length; i++){
        let key = localStorageObjKeys[i];
        let expenseDetails = localStorageObj[key];
        const expenseDetailsObj = JSON.parse(expenseDetails);
        showUserOnScreen(expenseDetailsObj)
    }
})
function showUserOnScreen(user){
    amount.value = ''
    description.value = ''
    catagory.value = ''
    const parentNode = document.getElementById('listofexpenses')
    const childHTML = `<li id=${user.description}>${user.amount} : ${user.description} : ${user.catagory} <button class="btn btn-outline-primary btn-sm" onclick=deleteExpense('${user.description}')>Delete Expense</button> <button class="btn btn-outline-primary btn-sm" onclick=editExpense('${user.amount}','${user.description}','${user.catagory}')>Edit Expense</button></li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function deleteExpense(description){
    localStorage.removeItem(description)
    removerExpenseFromScreen(description);
}
function removerExpenseFromScreen(description){
    console.log(description)
    const parentNode = document.getElementById('listofexpenses')
    const nodeToBeDeleted = document.getElementById(description);
    if(nodeToBeDeleted){
        parentNode.removeChild(nodeToBeDeleted);
    }
}
function editExpense(amt, descrp, cat){
    document.getElementById('amount').value = amt;
    document.getElementById('description').value = descrp;
    document.getElementById('catagory').value = cat;
    deleteExpense(descrp);
}