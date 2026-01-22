const likeBtn = document.querySelector(".like-btn")
const likeCount = document.querySelector(".like-count")
likeBtn.addEventListener("click", () => {
    let count = parseInt(likeBtn.textContent);

    count++;
    likeBtn.textContent = count;
})