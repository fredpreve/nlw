const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const buttonCloseSearch = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

buttonCloseSearch.addEventListener("click", () => {
    modal.classList.add("hide")
})