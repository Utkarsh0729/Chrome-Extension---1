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
        console.log("1");
        const currentBookmarks = await getCurrentBookmarks();
        
        //generating Name and UniqueId
        problemURL = window.location.href;
        const ind = problemURL.indexOf("?");
        if(ind !== -1) {
            problemURL = problemURL.substring(0, ind);
        }
        const problemName = document.querySelector(".coding_problem_info_heading__G9ueL").textContent;
        const uniqueId = problemName;
        
        console.log(currentBookmarks);
        if(currentBookmarks.some((bookmark) => bookmark.id === uniqueId)) {
            console.log("Problem already bookmarked!");
            alert('Problem already bookmarked!');
            return;
        }
        console.log("3");
        
        const bookmarkObj = {
            id: uniqueId,
            name: problemName,
            url: problemURL
        }
        
        const updatedBookmarks = [bookmarkObj, ...currentBookmarks];
        
        chrome.storage.sync.set({Problem_Key: updatedBookmarks}, () => {
            alert('Problem bookmarked!');
            console.log("Updated bookmarks to ", updatedBookmarks);
        })
        console.log("4");
        
    }


    function getCurrentBookmarks() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([Problem_Key], (results) => {
                resolve(results[Problem_Key] || []);
            });
        });
    }