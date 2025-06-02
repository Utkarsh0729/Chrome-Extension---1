const Problem_Key = "Problem_Key";
const assetsURL = {
    "play" : chrome.runtime.getURL("assets/play.png"),
    "delete" : chrome.runtime.getURL("assets/delete.png")
}

const bookmarkSection = document.getElementById("bookmarks");

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([Problem_Key], (data) => {
        const currentBookmarks = data[Problem_Key] || [];
        viewBookmarks(currentBookmarks);

    });
});
 
function viewBookmarks(bookmarks) {
    bookmarkSection.innerHTML = "";

    if(bookmarks.length == 0) {
        bookmarkSection.innerHTML = "<i>No bookmark to show </i>";
        return;
    }

    bookmarkSection.innerHTML = "";
    bookmarks.forEach(bookmark => addNewBookmark(bookmark));
}


function addNewBookmark(bookmark) {
    const newBookmark = document.createElement("div");
    const bookmarkTitle = document.createElement("div");
    const bookmarkControls = document.createElement("div");

    newBookmark.classList.add("bookmark");

    bookmarkTitle.textContent = bookmark.name;
    bookmarkTitle.classList.add("bookmark-title");

    bookmarkControls.classList.add("bookmark-controls");

    setControlAttributes(assetsURL["play"], onPlay, bookmarkControls);
    setControlAttributes(assetsURL["delete"], onDelete, bookmarkControls);

    newBookmark.appendChild(bookmarkTitle);
    newBookmark.appendChild(bookmarkControls);

    bookmarkSection.appendChild(newBookmark);
}

function setControlAttributes(src, handler, parentDiv) {
    const controlElement = document.createElement("img");
    controlElement.src = src;
    controlElement.addEventListener("click", handler);
    parentDiv.appendChild(controlElement);
}

function onPlay() {

}

function onDelete() {

}