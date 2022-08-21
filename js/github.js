projects = _(".gh-projects");
var msnry = new Masonry(".gh-projects", { "percentPosition": true });

fetch("https://api.github.com/search/repositories?q=user:XilogOfficial&sort=stars&order=desc")
.then((resp) => resp.json())
.then(function(data) {
    for (var i = 0; i < 6; i++) {
        item = data.items[i]

        projects.innerHTML += `
        <a href="${item.html_url}" class="col-sm-6" style="color: inherit;">
            <div class="card aos arrow" data-aos="fadein-up">
                <h3>${item.name}</h3>
                <p2>${item.description}</p2>
                <div class="stars">
                    <i class="bi-star-fill"></i> ${item.stargazers_count}
                </div>
            </div>
        </a>
        `
    }

    msnry.reloadItems()
    msnry.layout()
    // Array.from() converts the HTMLCollection to an array
    Array.from(projects.children).forEach(e => addHaptics(e))
})
.catch(function(error) {
    console.log(error);

    projects.innerHTML += `
    <a style="color: inherit;">
        <div class="card aos" data-aos="fadein-up">
            <h3>Hmm...</h3>
            <p2>I can't seem to be able to access GitHub. Something in your network may be blocking it.</p2>
        </div>
    </a>
    `
});