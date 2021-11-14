const champWrapper = document.querySelector(".champ-wrapper");

function getData() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.22.1/data/tr_TR/champion.json"
  )
    .then((res) => res.json())
    .then((res) => {
      const name = Object.values(res.data);
      console.log(res);
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
    });
}

getData();
