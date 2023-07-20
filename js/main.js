var userProductName=document.getElementById("ProductName");
var userProductPrice=document.getElementById("ProductPrice");
var userProductCategory=document.getElementById("ProductCategory");
var userProductDescription=document.getElementById("ProductDescription");
var tableRaws=document.getElementById("tableBody");
var productSearch=document.getElementById("ProductSearch");
var updateObject=false;
var updateObjectIndex;
var modeOfSearch="searchByName";
var pruductList=[];
if(JSON.parse(localStorage.getItem("array")).length>0){
    pruductList=JSON.parse(localStorage.getItem("array"));
    addArrayListToTable(pruductList);
}
else{
    pruductList=[];
}


function createProductObject(name,price,category,description){
    var product={
        productName:name,
        productPrice:price,
        productCategory:category,
        productDescription:description
    }

    return product;
}

function addProductObjectToArrayList(productObject){
    if(updateObject==false){
        pruductList.push(productObject);
        return pruductList;
    }
else{
    if(updateObjectIndex==pruductList.length-1){
        pruductList.pop()
        pruductList.push(productObject);
    }
    else{
        deleteRaw(updateObjectIndex);
        pruductList.splice(updateObjectIndex,0,productObject);
    }
   
    updateObject=false;
    document.getElementById("raw-"+updateObjectIndex).removeAttribute("style");
    return pruductList;
}

}

function addArrayListToLocalSorage(arrayList){
    
    localStorage.setItem("array",JSON.stringify(arrayList));
    var productListLocalStorage= JSON.parse(localStorage.getItem("array"));
    console.log(productListLocalStorage);
    return productListLocalStorage;

}



function clearProductDataFromFormInputsAfterAdditionToArrayList(){
    userProductName.value="";
    userProductPrice.value="";
    userProductCategory.value="";
    userProductDescription.value="";
}

function addArrayListToTable(arrayList){
var container="";
for(var i=0;i<arrayList.length;i++){
    container+=` <tr id="raw-${i}">
    <th scope="row">${i}</th>
    <td>${arrayList[i].productName}</td>
    <td>${arrayList[i].productPrice}</td>
    <td>${arrayList[i].productCategory}</td>
    <td>${arrayList[i].productDescription}</td>
    <td><button class="btn btn-info" onclick="updateRaw(${i})">update</button></td>
    <td><button class="btn btn-primary" onclick="deleteRaw(${i})">delete</button></td>
  </tr>`
}
tableRaws.innerHTML=container;

}

function updateRaw(index){
    if(updateObject==false){  
        userProductName.value=pruductList[index].productName;
        userProductPrice.value=pruductList[index].productPrice;
        userProductCategory.value=pruductList[index].productCategory;
        userProductDescription.value=pruductList[index].productDescription;
        document.getElementById("raw-"+index).setAttribute("style","background-color:red");
        updateObject=true;
        updateObjectIndex=index;
    }

        else{
            alert("Please, finish this update first");
        }
  
}


function deleteRaw(index){
    if(index==updateObjectIndex){
        clearProductDataFromFormInputsAfterAdditionToArrayList();
        updateObject=false;
    }
 pruductList.splice(index,1);
addArrayListToTable(addArrayListToLocalSorage(pruductList));
}


function addProductToTable(){

addArrayListToTable(addArrayListToLocalSorage(addProductObjectToArrayList(createProductObject(userProductName.value,userProductPrice.value,userProductCategory.value,userProductDescription.value))));
clearProductDataFromFormInputsAfterAdditionToArrayList();
}



function searchMode(mode){
    if(mode=="searchByName"){
        productSearch.removeAttribute("placeholder");
        productSearch.setAttribute("placeholder","Search By Product Name....");
        productSearch.value="";
        addArrayListToTable(pruductList);
        modeOfSearch=mode;
    }
    else if(mode=="searchByCategory"){
        productSearch.removeAttribute("placeholder");
        productSearch.setAttribute("placeholder","Search By Product Category....");
        productSearch.value="";
        addArrayListToTable(pruductList);
        modeOfSearch=mode;
    }

    else{
        mode=modeOfSearch;
    }
    
}

function searchForProduct(searchChar){
    var container="";
for(var i=0;i<pruductList.length;i++){
    if(modeOfSearch=="searchByName"){
        if(pruductList[i].productName.toLowerCase().includes(searchChar.toLowerCase())){
            container+=` <tr id="raw-${i}">
    <th scope="row">${i}</th>
    <td>${pruductList[i].productName}</td>
    <td>${pruductList[i].productPrice}</td>
    <td>${pruductList[i].productCategory}</td>
    <td>${pruductList[i].productDescription}</td>
    <td><button class="btn btn-info" onclick="updateRaw(${i})">update</button></td>
    <td><button class="btn btn-primary" onclick="deleteRaw(${i})">delete</button></td>
  </tr>`
        }
    }
    else{
        if(pruductList[i].productCategory.toLowerCase().includes(searchChar.toLowerCase())){
            container+=` <tr id="raw-${i}">
    <th scope="row">${i}</th>
    <td>${pruductList[i].productName}</td>
    <td>${pruductList[i].productPrice}</td>
    <td>${pruductList[i].productCategory}</td>
    <td>${pruductList[i].productDescription}</td>
    <td><button class="btn btn-info" onclick="updateRaw(${i})">update</button></td>
    <td><button class="btn btn-primary" onclick="deleteRaw(${i})">delete</button></td>
  </tr>`
        }
    }
}
tableRaws.innerHTML=container;
}


function reset(){
    addArrayListToTable(addArrayListToLocalSorage(pruductList));
    productSearch.value="";
}

function deleteAll(){
    pruductList=[];
    localStorage.clear();
    addArrayListToTable(addArrayListToLocalSorage(pruductList));
    productSearch.value="";
}