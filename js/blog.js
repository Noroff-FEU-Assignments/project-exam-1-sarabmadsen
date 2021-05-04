const resultsContainer = document.querySelector(".blog-posts");
const buttonMore = document.querySelector("button");

const apiUrl =
 "https://sanobo.no/weddingblog/wp-json/wp/v2/posts?per_page=15&_embed";

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        const results = await response.json();

        console.log(results);

        resultsContainer.innerHTML = "";

        for (let i = 0; i < results.length; i++) {

            if (i == 9) {
                break;
            }

            const formatDate = new Date(results[i].date).toLocaleString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            resultsContainer.innerHTML += 
                `<div class="post">
                <div><img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" 
                alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}" /></div>
                <div class="text"><h2>${results[i].title.rendered}</h2>
                <p>${formatDate}</p>
                <p>${results[i].excerpt.rendered} <a href="blog-page.html?id=${results[i].id}">Read more</a></p></div></div>`
        }
        
    } catch (error) {
        console.log(error);
    }
}


fetchApi(apiUrl);