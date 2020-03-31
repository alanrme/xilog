function gallery(data) {
    for (p of data.photos.photo) {
        $('#port-items').append(`
        <div class="p-item">
        <img src="https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_z.jpg" alt="${p.title}" class="img-responsive centered"style="display: block;">
        <div class="p-name">${p.title}</div>
        <div class="p-desc">${p.description._content}</div>
        </div>
        `)
    }
}