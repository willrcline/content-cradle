document.querySelector("#save-changes-btn").addEventListener("click", fetchEditBlogPost)
document.querySelector("#delete-blog-post-btn").addEventListener("click", fetchDeleteBlogPost)
var blog_post_id = document.querySelector("#blog-post-container").getAttribute('data-blog-post-id')

async function fetchEditBlogPost() {
    var title = document.querySelector("#title").value
    var content = document.querySelector("#content").value
    var reqBody = {title: title, content: content, blog_post_id: blog_post_id}

    const response = await fetch('/api/blog', {
        method: 'PUT',
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

async function fetchDeleteBlogPost() {
    window.location.href = "/";

    var reqBody = {blog_post_id: blog_post_id}

    const response = await fetch('/api/blog', {
        method: 'DELETE',
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