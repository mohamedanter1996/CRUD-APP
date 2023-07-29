var userProductName = document.getElementById("ProductName");
var userProductPrice = document.getElementById("ProductPrice");
var userProductCategory = document.getElementById("ProductCategory");
var userProductDescription = document.getElementById("ProductDescription");
var addProductBtn = document.getElementById("addProduct");
var updateProductBtn = document.getElementById("updateProduct");
var tableRaws = document.getElementById("tableBody");
var productSearch = document.getElementById("ProductSearch");
var productNameValidRule=document.getElementById("productNameValidRule");
var productPriceValidRule=document.getElementById("productPriceValidRule");
var productCategoryValidRule=document.getElementById("productCategoryValidRule");
var productDescriptionValidRule=document.getElementById("productDescriptionValidRule");
var characterCounter=document.getElementById("characterCounter");
var updateObject = false;
var updateObjectIndex;
var clickUpdateBtn = false;
var modeOfSearch = "searchByName";
var pruductList;
if (localStorage.getItem("array") != null) {
    pruductList = JSON.parse(localStorage.getItem("array"));
    addArrayListToTable(pruductList);
} else {
    pruductList = [];
}

function createProductObject(name, price, category, description) {
    var product = {
        productName: name,
        productPrice: price,
        productCategory: category,
        productDescription: description,
    };

    return product;
}

function addProductObjectToArrayList(productObject) {
    pruductList.push(productObject);
    return pruductList;
}

function addArrayListToLocalSorage(arrayList) {
    localStorage.setItem("array", JSON.stringify(arrayList));
    var productListLocalStorage = JSON.parse(localStorage.getItem("array"));
    console.log(productListLocalStorage);
    return productListLocalStorage;
}

function clearProductDataFromFormInputsAfterAdditionToArrayList() {
    userProductName.value = "";
    userProductPrice.value = "";
    userProductCategory.value = "";
    userProductDescription.value = "";
    userProductName.classList.remove("input-valid");
    userProductPrice.classList.remove("input-valid");
    userProductCategory.classList.remove("input-valid");
    userProductDescription.classList.remove("input-valid");
    characterCounter.innerHTML="";
    
}

function addArrayListToTable(arrayList) {
    var container = "";

    for (var i = 0; i < arrayList.length; i++) {
        container += ` <tr id="raw-${productSearch.value.length > 0 ? pruductList.indexOf(arrayList[i]) : i
            }">
    <th scope="row">${productSearch.value.length > 0
                ? pruductList.indexOf(arrayList[i]) + 1
                : i + 1
            }</th>
    <td>${arrayList[i].newName ? arrayList[i].newName : arrayList[i].productName
            }</td>
    <td>${arrayList[i].productPrice}</td>
    <td>${arrayList[i].newCategory
                ? arrayList[i].newCategory
                : arrayList[i].productCategory
            }</td>
    <td class=""> <p class="d-inline-block overflow-auto">${arrayList[i].productDescription}</p></td>
    <td><button class="btn btn-info" onclick="updateRaw(${productSearch.value.length > 0 ? pruductList.indexOf(arrayList[i]) : i
            })">update</button></td>
    <td><button class="btn btn-primary" onclick="deleteRaw(${i})">delete</button></td>
  </tr>`;
    }
    tableRaws.innerHTML = container;
}

function updateRaw(index) {
    if (updateObject == false) {
        userProductName.value = pruductList[index].productName;
        userProductPrice.value = pruductList[index].productPrice;
        userProductCategory.value = pruductList[index].productCategory;
        userProductDescription.value = pruductList[index].productDescription;
        addProductBtn.classList.add("d-none");
        updateProductBtn.classList.remove("d-none");
        document
            .getElementById("raw-" + index)
            .setAttribute("style", "background-color:green");
        updateObject = true;
        updateObjectIndex = index;
        console.log(updateObjectIndex);
    } else {
        sweetAlert("STOP", "finish this update first!", "warning");
    }
}

function putUpdatedProductInTable() {
    clickUpdateBtn = true;
    var productObject = createProductObject(
        userProductName.value,
        userProductPrice.value,
        userProductCategory.value,
        userProductDescription.value
    );
    if (updateObjectIndex == pruductList.length - 1) {
        pruductList.pop();
        pruductList.push(productObject);
    } else {
        deleteRaw(updateObjectIndex);
        pruductList.splice(updateObjectIndex, 0, productObject);
    }

    updateObject = false;
    console.log(pruductList);
    productSearch.value == "" ? productSearch.value : productSearch.value = "";

    addArrayListToTable(addArrayListToLocalSorage(pruductList));
    document.getElementById("raw-" + updateObjectIndex).removeAttribute("style");
    clearProductDataFromFormInputsAfterAdditionToArrayList();
    addProductBtn.classList.remove("d-none");
    updateProductBtn.classList.add("d-none");
}

function deleteRaw(index) {
    if (index == updateObjectIndex && updateObject && clickUpdateBtn == false) {
        sweetAlert("STOP", "finish this update first!", "warning");
    } else {
        if (clickUpdateBtn == false) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover Product data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    pruductList.splice(index, 1);
                    addArrayListToTable(addArrayListToLocalSorage(pruductList));
                    swal("Success! Product data has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Product data is safe!");
                }
            });
        } else {
            pruductList.splice(index, 1);
            addArrayListToTable(addArrayListToLocalSorage(pruductList));
            console.log(pruductList);
            clickUpdateBtn = false;
        }
    }
}

function addProductToTable() {
    if(validProductRepeated(userProductName.value,
        userProductPrice.value,
        userProductCategory.value,
        userProductDescription.value)&&validAllDataOfProduct(userProductName.value,
            userProductPrice.value,
            userProductCategory.value,
            userProductDescription.value)){
        addArrayListToTable(
            addArrayListToLocalSorage(
                addProductObjectToArrayList(
                    createProductObject(
                        userProductName.value,
                        userProductPrice.value,
                        userProductCategory.value,
                        userProductDescription.value
                    )
                )
            )
        );
        clearProductDataFromFormInputsAfterAdditionToArrayList();
    }
    
}

function searchMode(mode) {
    if (mode == "searchByName") {
        productSearch.removeAttribute("placeholder");
        productSearch.setAttribute("placeholder", "Search By Product Name....");
        productSearch.value = "";
        addArrayListToTable(JSON.parse(localStorage.getItem("array")));
        modeOfSearch = mode;
    } else if (mode == "searchByCategory") {
        productSearch.removeAttribute("placeholder");
        productSearch.setAttribute("placeholder", "Search By Product Category....");
        productSearch.value = "";
        addArrayListToTable(JSON.parse(localStorage.getItem("array")));
        modeOfSearch = mode;
    } else {
        mode = modeOfSearch;
    }
}

function searchForProduct(searchChar) {
    var searchArrray = [];
    for (var i = 0; i < pruductList.length; i++) {
        if (modeOfSearch == "searchByName") {
            if (
                pruductList[i].productName
                    .toLowerCase()
                    .includes(searchChar.toLowerCase())
            ) {
                searchArrray.push(pruductList[i]);

                pruductList[i].newName = pruductList[i].productName
                    .toLowerCase()
                    .replace(
                        searchChar.toLowerCase(),
                        `<span class="text-danger">${searchChar.toLowerCase()}</span>`
                    );
            }
        } else {
            if (
                pruductList[i].productCategory
                    .toLowerCase()
                    .includes(searchChar.toLowerCase())
            ) {
                pruductList[i].newCategory = pruductList[i].productCategory
                    .toLowerCase()
                    .replace(
                        searchChar.toLowerCase(),
                        `<span class="text-danger">${searchChar.toLowerCase()}</span>`
                    );
                searchArrray.push(pruductList[i]);
            }
        }
    }


    addArrayListToTable(searchArrray);
}

function reset() {
    if (updateObject == false) {
        console.log(pruductList);
        productSearch.value = "";
        addArrayListToTable(JSON.parse(localStorage.getItem("array")));
    } else {
        sweetAlert("STOP", "Product data still under update mode!", "warning");
    }
}

function deleteAll() {
    if (updateObject == false) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover all product data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                pruductList = [];
                localStorage.clear();
                addArrayListToTable(addArrayListToLocalSorage(pruductList));
                productSearch.value = "";
                swal("Success! all product data has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("all product data is safe!");
            }
        });
    } else {
        sweetAlert("STOP", "Product data still under update mode!", "warning");
    }
}

function validateProductName(nameValue){
var regex=/^[A-Z][a-z]{3,8}$/;
if(regex.test(nameValue)){
    userProductName.classList.add("input-valid");
    userProductName.classList.remove("input-invalid");
    productNameValidRule.classList.add("d-none");
    return regex.test(nameValue);

}else{
userProductName.classList.add("input-invalid");
userProductName.classList.remove("input-valid");
productNameValidRule.classList.remove("d-none");
return regex.test(nameValue);
}
}

function validateProductPrice(priceValue){
    var regex=/^([1-9][0-9][0-9][0-9]|10000)$/;
    if(regex.test(priceValue)){
        userProductPrice.classList.add("input-valid");
        userProductPrice.classList.remove("input-invalid");
        productPriceValidRule.classList.add("d-none");
        return regex.test(priceValue);
    
    }else{
        userProductPrice.classList.add("input-invalid");
        userProductPrice.classList.remove("input-valid");
    productPriceValidRule.classList.remove("d-none");
    return regex.test(priceValue);
    }
    }
    
function validateProductCategory(categoryValue){
        var regex=/^(Tv|Mobile|Laptop)$/;
        if(regex.test(categoryValue)){
            userProductCategory.classList.add("input-valid");
            userProductCategory.classList.remove("input-invalid");
            productCategoryValidRule.classList.add("d-none");
            return regex.test(categoryValue);
        
        }else{
        userProductCategory.classList.add("input-invalid");
        userProductCategory.classList.remove("input-valid");
        productCategoryValidRule.classList.remove("d-none");
        return regex.test(categoryValue);
        }
        }

        function validateProductDescription(descriptionValue){
            characterCounter.innerHTML=descriptionValue.length;
            var regex=/^[a-zA-Z0-9.,\s]{250,}$/;
            if(regex.test(descriptionValue)){
                userProductDescription.classList.add("input-valid");
                userProductDescription.classList.remove("input-invalid");
                productDescriptionValidRule.classList.add("opacity-0");
                characterCounter.classList.remove("text-danger");
                characterCounter.classList.add("text-success");
                return regex.test(descriptionValue);
            
            }else{
            userProductDescription.classList.add("input-invalid");
            userProductDescription.classList.remove("input-valid");
            productDescriptionValidRule.classList.remove("opacity-0");
            characterCounter.classList.add("text-danger");
                characterCounter.classList.remove("text-success");
            return regex.test(descriptionValue);
            }
            } 
            
            function validAllDataOfProduct(productNameValue,productPriceValue,productCategoryValue,productDescriptionValue){
            if(validateProductName(productNameValue)&&validateProductPrice(productPriceValue)&&validateProductCategory(productCategoryValue)&&validateProductDescription(productDescriptionValue)){
            return true;
            }else{
                sweetAlert("WRONG", "make sure to insert all data of the product in the correct way!", "error");
            }

            }

            function validProductRepeated(productNameValue,productPriceValue,productCategoryValue,productDescriptionValue){
                if(pruductList.length>0){
                    for(var i=0;i<pruductList.length;i++){
                     if((pruductList[i].productName==productNameValue)&&(pruductList[i].productPrice==productPriceValue)&&(pruductList[i].productCategory==productCategoryValue)&&(pruductList[i].productDescription==productDescriptionValue)){
                        sweetAlert("STOP", "product data is repeated", "warning");
                        return false;
                     }else{
                        return true;
                     }

                    }
                }
                else{
                    return true;
                }
            }