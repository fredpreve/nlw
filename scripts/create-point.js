function populateUFs() {
    const ufSelect =
        document
            .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then((states) => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then((res) => { return res.json() })
    .then((cities) => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value ="${city.id}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    } )


}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// itens de coleta

// catch all li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// 

// update hidden field with selected items
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // add or remove class with js
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id;

    // check if there are selected items.
    const alreadySelected = selectedItems.findIndex( (item) => { 
        return item == itemId
    })
    
    // If current item is already selected, then unselected it
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
         })

         selectedItems = filteredItems
    } else {
        // if don't, add the selected item to the selected items array
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}