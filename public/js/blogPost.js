// document.querySelector("#comment-btn").addEventListener("click", showCommentInput)

// function showCommentInput() {
//     document.querySelector("#comment-input").classList.remove("display-none")
//     document.querySelector("#submit-comment").classList.remove("display-none")
// }

window.addEventListener('load', function() {
document.querySelector("#submit-comment").addEventListener("click", submitComment)
})

async function submitComment() {
    var content = document.querySelector("#comment-input").value
    document.querySelector("#comment-input").value = ""
    var blog_post_id = document.querySelector("#blog-post-container").getAttribute('data-blog-post-id')

    var reqBody = {content:content, blog_post_id:blog_post_id}


    const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + token // for authorized requests
        },
        body: JSON.stringify(reqBody),
      });
    
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
    
      return await response.json(); // parses JSON response into native JavaScript objects
}