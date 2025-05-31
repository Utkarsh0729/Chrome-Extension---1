   const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
   
   
   window.addEventListener("load", addBookmarkButton);

    function addBookmarkButton() {
        const bookmarkButton = document.createElement("img");
        bookmarkButton.id = "add-bookmark-button";
        bookmarkButton.src = bookmarkImgURL;
        bookmarkButton.style.height = "30px";
        bookmarkButton.style.width = "30px";
        bookmarkButton.style.margin = "0px 0px 8px";

        const parentDiv = document.querySelector(".p-4");
        parentDiv.insertBefore(bookmarkButton, parentDiv.children[1]);
        
        bookmarkButton.addEventListener('click', () => {
        alert('Problem bookmarked!');
        });
    }
