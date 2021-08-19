projects = _(".gh-projects");

fetch("https://api.github.com/search/repositories?q=user:XilogOfficial&sort=stars&order=desc")
.then((resp) => resp.json())
.then(function(data) {
    for (var i = 0; i < 6; i++) {
        item = data.items[i]

        projects.innerHTML += `
        <a href="${item.html_url}" style="color: inherit;">
            <div class="card aos" data-aos="fadein-up">
                <h3>${item.name}</h3>
                <p2>${item.description}</p2>
                <div class="stars">
                    <i class="bi-star-fill"></i> ${item.stargazers_count}
                </div>
            </div>
        </a>
        `
    }
})
.catch(function(error) {
    console.log(error);
});