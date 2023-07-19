var userProductName=document.getElementById("ProductName");
var userProductPrice=document.getElementById("ProductPrice");
var userProductCategory=document.getElementById("ProductCategory");
var userProductDescription=document.getElementById("ProductDescription");
var tableRaws=document.getElementById("tableBody");
var pruductList=[];
var updateObject=false;
var updateObjectIndex;

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
    if(updateObject==false){pruductList.push(productObject);
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
    userProductName.value=pruductList[index].productName;
    userProductPrice.value=pruductList[index].productPrice;
    userProductCategory.value=pruductList[index].productCategory;
    userProductDescription.value=pruductList[index].productDescription;
    document.getElementById("raw-"+index).setAttribute("style","background-color:red");
    updateObject=true;
    updateObjectIndex=index;
}


function deleteRaw(index){
pruductList.splice(index,1);
addArrayListToTable(pruductList);
}


function addProductToTable(){
  
//    console.log(addProductObjectToArrayList(createProductObject(userProductName.value,userProductPrice.value,userProductCategory.value,userProductDescription.value)));

addArrayListToTable(addProductObjectToArrayList(createProductObject(userProductName.value,userProductPrice.value,userProductCategory.value,userProductDescription.value)));
clearProductDataFromFormInputsAfterAdditionToArrayList();
}