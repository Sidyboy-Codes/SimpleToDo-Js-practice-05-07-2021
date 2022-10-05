function makeList() {

    tit = document.getElementById("TON").value;
    dis = document.getElementById("DON").value;
    console.log(tit, dis);

    //here now it is necessary to use if else bcz when we "delete" all notes then local storage is empty
    // and when we add another fresh note it will call "makeList" but if we don't check for LS is null or not
    // it will try to find listJson but our lS is empty
    // so in "listArray = JSON.parse(localStorage.getItem("listJson"));" listArray will have null value as we have not initialized listJson yet.      

    if (localStorage.getItem("listJson") == null) // first 
    {
        listArray = [];
        listArray.push([tit, dis]);
        localStorage.setItem("listJson", JSON.stringify(listArray));

    } else {

        listArray = JSON.parse(localStorage.getItem("listJson"));
        listArray.push([tit, dis]); // to add new item into array then again converting it to json in next line
        localStorage.setItem("listJson", JSON.stringify(listArray));

    }



    addingToTable();
}

function listexist() {
    console.log("list exist is called")

    if (localStorage.getItem("listJson") == null) { //local storage will be empty for 1st time only bcz once you use it always there will be "[]" in your local storage (it will be stored on your pc) until u empty localstorage manually"
        listArray = []; // if listJson is empty listarray should also be empty       
        localStorage.setItem("listJson", JSON.stringify(listArray)); // using this line to convert array --> JSON
        console.log("localstorage is null");
    } else {

        listArray = JSON.parse(localStorage.getItem("listJson")); //using this line we are concerting JSON --> its orifinal state i.e array over here and then we will send it to "addingToTable"    
        //localStorage.setItem("listJson", JSON.stringify(listArray)); of no use
        addingToTable();
    }


}

function addingToTable() {

    // adding notes to table
    lTable = document.getElementById("listTable");
    str = "";
    listArray.forEach((childArray, index) => {
        // console.log(childArray[0],childArray[1],index); childArrayp[0] is title and childArray[1] is desc
        str +=
            `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${childArray[0]}</td>
    <td>${childArray[1]}</td>
    <td><button class="btn btn-sm btn-primary" onClick="deleteMe(${index})" >Delete</button></td>
    </tr>
    `
    });
    // we are adding new rows to table using str += means previous str + new str

    // console.log("New str is", str, lTable);
    lTable.innerHTML = str;
}

function deleteMe(listIndex) {
    listArray = JSON.parse(localStorage.getItem("listJson"));
    listArray.splice(listIndex, 1);
    localStorage.setItem("listJson", JSON.stringify(listArray));
    listexist();
    
}

function clearing() {
    if (confirm("are you sure you want to clear all Notes ?")) {

        localStorage.clear();

        listArray = JSON.parse(localStorage.getItem("listJson")); //i'm also clearing out array
        listArray = [];
        localStorage.setItem("listJson", JSON.stringify(listArray));

        listexist();
    }
    // window.location.reload(); // to refresh page
}

add = document.getElementById("add");
add.addEventListener("click", makeList);
listexist();