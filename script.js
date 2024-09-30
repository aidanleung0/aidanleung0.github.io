function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const track = document.getElementById("image-track");

// function cloneImages() {
//     const images = Array.from(track.children); // Get all current images
//     images.forEach(image => {
//         const clone = image.cloneNode(true); // Deep clone each image
//         track.appendChild(clone); // Append cloned images to the track
//     });
// }

// // Call the function to clone the images
// cloneImages();

track.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

track.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

track.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -50);;
    
    track.dataset.percentage = nextPercentage;

    // track.style.transform = `translate(${percentage}%, -75%)`;
    track.animate({
        transform: `translate(${nextPercentage}%, -75%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) {
        // image.style.objectPosition = `${nextPercentage + 100} 50%`;
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {duration: 1200, fill: "forwards"});
    }

    
}