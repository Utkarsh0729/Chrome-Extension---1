   const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
   const Problem_Key = "Problem_Key";
   
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
        
        bookmarkButton.addEventListener('click', addNewBookmarkHandler);
    }
    
    async function addNewBookmarkHandler() {
        const currentBookmarks = await getCurrentBookmarks();


        const problemURL = window.location.href;
        const ind = problemURL.indexOf("?", 26);
        const uniqueId = problemURL.substring(26, ind);
        const problemName = document.querySelector(".coding_problem_info_heading__G9ueL").textContent;

        if(currentBookmarks.some((bookmark) => bookmark.id === uniqueId)) return;

        const bookmarkObj = {
            id: uniqueId,
            name: problemName,
            url: problemURL
        }

        const updatedBookmarks = [...currentBookmarks, bookmarkObj];

        chrome.storage.sync.set({Problem_Key: updatedBookmarks}, () => {
            alert('Problem bookmarked!');
            console.log("Updated bookmarks to ", updatedBookmarks);
        })

    }


    function getCurrentBookmarks() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([Problem_Key], (results) => {
                resolve(results[Problem_Key] || []);
            });
        });
    }