let currentUser = localStorage.getItem('currentUser');

if(!currentUser) location.href = 'index.html';

class Transaction{
    constructor(date,amount,type,description = '',balanceBefore = 0){
        this.id = crypto.randomUUID();
        this.date = date;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.balanceBefore = balanceBefore
    }

    getBalanceAfter(){
        if(this.type == 'Expense'){
            return this.balanceBefore - this.amount
        }

        if(this.type == 'Income'){
            return this.balanceBefore + this.amount
        }
    }
}

let currUserData = loadUserData();

window.onload = () => {
    renderUI();
};



function loadUserData(){
    const stored = localStorage.getItem(`budget_${currentUser}`);
    const data = stored? JSON.parse(stored) : addNewUser();

    data.transactions = data.transactions.map((t) => new Transaction(
        t.date, Number(t.amount), t.type, t.description, Number(t.balanceBefore)
    ));

    return data
}
function addNewUser(){
    localStorage.setItem(`budget_${currentUser}`,JSON.stringify({
        userName : currentUser,
        transactions: []
    }))

    return JSON.parse(localStorage.getItem(`budget_${currentUser}`));
}


function renderUI(){   
    const h1 = document.getElementById('pageTitle');    
    h1.innerHTML = `Welcome <span>${currentUser}</span> to Budget tracker`;

    const stats = getStats();
    const balance = document.getElementById('balance');
    balance.innerHTML = `${stats.currBalance} EG`;

    const income = document.getElementById('income');
    income.innerHTML = `${stats.totalIncome} EG`;

    const expense = document.getElementById('expense');   
    expense.innerHTML = `${stats.totalExpense} EG`;

    let arr=[]


    const tbody = document.getElementById('trData');
    
    tbody.innerHTML = '';
    for(let transaction of currUserData.transactions.reverse()){
        tbody.innerHTML += `
            <tr id=${transaction.id}>
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.description}</td>
                <td>${(transaction.type == "Income")? transaction.amount : '-'}</td>
                <td>${(transaction.type == "Expense")? transaction.amount : '-'}</td>
                <td>${transaction.getBalanceAfter()}</td>
                <td>
                    <button class="view" onclick="viewTransaction('${transaction.id}')">
                        <img src="assets/eye-regular.svg" alt="view" title="View">
                    </button>
                    <button class="delete"><img src="assets/material-symbols_delete.svg" alt="delete" onClick=deleteTransaction('${transaction.id}') title="Delete"></button>
                </td>
            </tr>
        `
    }
}

function getStats(){
    let totalExpense = currUserData.transactions.filter((t) => t.type == 'Expense').reduce((totalExpense,t) => totalExpense + t.amount,0)
    let totalIncome = currUserData.transactions.filter((t) => t.type == 'Income').reduce((totalIncome,t) => totalIncome + t.amount,0)
    let currBalance = totalIncome - totalExpense;

    return {
        currBalance: currBalance,
        totalIncome: totalIncome,
        totalExpense: totalExpense
    }
}
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function saveUserData(data){
    localStorage.setItem(`budget_${currentUser}`, JSON.stringify(data));
}
function addTransaction(event) {
    event.preventDefault(); 

    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("description").value;
    const dateInput = document.getElementById("date").value;
    const date = dateInput? formatDate(dateInput) : formatDate(new Date());
    const type = document.getElementById("type").value;

    if (!amount || !desc) return alert("Please fill all fields.");

    const data = currUserData;
    const entry = new Transaction(
        date,
        Number(amount),
        type,
        desc,
        getStats(data).currBalance
    );


    data.transactions.push(entry);

    saveUserData(data);
    renderUI();
}

function deleteTransaction(id){
    currUserData.transactions = currUserData.transactions.filter(t => t.id !== id);
    // console.log(currUserData.transactions);
    
    saveUserData(currUserData);
    renderUI();
}

function viewTransaction(id) {
    const transaction = currUserData.transactions.find(t => t.id === id);
    if (!transaction) return;

    document.getElementById("modalDate").textContent = formatDate(transaction.date);
    document.getElementById("modalDesc").textContent = transaction.description;
    document.getElementById("modalType").textContent = transaction.type;
    document.getElementById("modalAmount").textContent = transaction.amount + " EG";
    document.getElementById("modalBefore").textContent = transaction.balanceBefore + " EG";
    document.getElementById("modalAfter").textContent = transaction.getBalanceAfter() + " EG";

    document.getElementById("transactionModal").style.display = "flex";
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("transactionModal").style.display = "none";
};

window.onclick = function(event) {
    const modal = document.getElementById("transactionModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
