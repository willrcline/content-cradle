document.querySelector("#create-post-btn").addEventListener("click", showBlogInput)
document.querySelector("#submit").addEventListener("click", createBlogPost)

function showBlogInput() {
    document.querySelector("#create-post-form").classList.remove("display-none")
    document.querySelector("#create-post-btn").classList.add("display-none")
}

async function createBlogPost() {
    var title = document.querySelector("#title").value
    var content = document.querySelector("#content").value
    var reqBody = {title: title, content: content}

    const response = await fetch('/api/blog', {
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
    
      return await response.json()
}

window.addEventListener('load', function() {
  var blogPostTitleEls = document.querySelectorAll(".blogpost-title")
  for (var blogPostTitleEl of blogPostTitleEls) {
      blogPostTitleEl.addEventListener("click", goToEditPageForBlogPost)
  } 
});

function goToEditPageForBlogPost(e) {
  var blogPost_id = e.target.getAttribute('data-blog-post-id')
  console.log("goToEditPageForBlogPost() blogPost_id_________", blogPost_id)

  window.location.href = `/blogpost/edit/${blogPost_id}`
}
