function findPhotos() {
    var script = document.createElement('script');

    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="
        + document.getElementById("parameters").value;

    document.querySelector('head').appendChild(script);
    boardSearch();
}

function jsonFlickrFeed(data) {
    var image = "";
    data.items.forEach(function (element) {
        image += `<img src=" ${element.media.m} "/>`
    });

    document.getElementById("flikr").innerHTML = image;
}

function boardSearch() {
    var boards = [];
    PDK.request('/me/boards/', function (response) { // Make sure to change the board_id
        console.log(response);
        if (!response || response.error) {
            alert('Error occurred');
        } else {
            boards = boards.concat(response.data);
            if (response.hasNext) {
                response.next(); // this will recursively go to this same callback
            }
        }
    });
}

// 5056103943636043675
// Secret: 488e7944aa97f580cd72f575c2aeafaa254a6623f8c9e6984c5ae86d0a0e1f21