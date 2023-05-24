window.addEventListener('load', function() {
    var blogPostTitleEls = document.querySelectorAll(".blogpost-title")
    for (var blogPostTitleEl of blogPostTitleEls) {
        blogPostTitleEl.addEventListener("click", fetchBlogPostPage)
    } 
});


function fetchBlogPostPage(e) {
    var blogPost_id = e.target.getAttribute('data-blog-post-id')
    console.log("fetchBlogPostPage() blogPost_id_________", blogPost_id)

    window.location.href = `/blogpost/${blogPost_id}`
}