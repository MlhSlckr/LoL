const champWrapper = document.querySelector(".champ-wrapper");
const searchInput = document.querySelector(".search");
function getData() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.22.1/data/tr_TR/champion.json"
  )
    .then((res) => res.json())
    .then((res) => {
      const name = Object.values(res.data);
      console.log(name);
      for (let x = 0; x < name.length; x++) {
        champWrapper.innerHTML += `
        <div class='champ'>
          <img src="http://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/${name[x].id}.png" alt="">
          <h1 class='name'>${name[x].id}</h1>
          <p class='title'>${name[x].title}</p>
          <p class='blurb'>${name[x].blurb}</p>
          <p class='tag'>${name[x].tags}</p>
        </div>
        `;
      }
      searchInput.addEventListener("input", () => {
        const champNames = document.querySelectorAll(".name");
        const search = searchInput.value.toLowerCase();
        champNames.forEach((champName) => {
          champName.parentElement.style.display = "flex";

          if (!champName.innerHTML.toLowerCase().includes(search)) {
            champName.parentElement.style.display = "none";
          }
        });
      });
    });
}

getData();
