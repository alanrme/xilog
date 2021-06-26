fetch("https://api.github.com/search/repositories?q=user:XilogOfficial&sort=stars&order=desc")
.then((resp) => resp.json())
.then(function(data) {
    for (var i = 0; i < 6; i++) {
        item = data.items[i]
        $(".gh-projects").append(`
        <a href="${item.html_url}" style="color: inherit;">
            <div class="card">
                <h4>${item.name}</h4>
                <p2>${item.description}</p2>
            </div>
        </a>
        `)
    }
})
.catch(function(error) {
    console.log(error);
});