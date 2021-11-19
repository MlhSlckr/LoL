const champWrapper = document.querySelector(".champ-wrapper");
const searchInput = document.querySelector(".search");
const menuBtn = document.querySelector(".menu");
const favorite = document.querySelector(".favorite");
const body = document.querySelector("body");
const clearBtn = document.querySelector(".clear");

function getData() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.22.1/data/tr_TR/champion.json"
  )
    .then((res) => res.json())
    .then((res) => {
      const name = Object.values(res.data);
      for (let x = 0; x < name.length; x++) {
        champWrapper.innerHTML += `
        <div class='champ'>
          <img src="http://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/${
            name[x].id
          }.png" alt="">
          <h1 class='name'>${name[x].id}</h1>
          <p class='title'>${name[x].title}</p>
          <p class='blurb'>${name[x].blurb}</p>
          <p class='tag'>${name[x].tags}</p>
          <i class="fas fa-star star" data-id="${[x]}"></i>
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

      function startConf() {
        const champs = JSON.parse(localStorage.getItem("champs"));
        const stars = JSON.parse(localStorage.getItem("stars"));
        if (!champs) {
          localStorage.setItem("champs", JSON.stringify([]));
        } else {
          champs.forEach((champ) => {
            addHTML(champ);
          });
        }
        if (!stars) {
          localStorage.setItem("stars", JSON.stringify([]));
        }
      }

      startConf();

      const stars = document.querySelectorAll(".star");

      stars.forEach((star) => {
        star.addEventListener("click", (e) => {
          const name = e.currentTarget.parentElement.children[1].textContent;
          const img = e.currentTarget.parentElement.children[0].src;
          const title = e.currentTarget.parentElement.children[2].textContent;
          const tag = e.currentTarget.parentElement.children[4].textContent;
          e.currentTarget.classList.toggle("fav");
          console.log(e.currentTarget);
          favorite.innerHTML += `
          <div class='wrapper'>
            <img src="${img}" alt="">
            <div class='texts'>
              <h1 class='name'>${name}</h1>
              <p class='title'>${title}</p>
              <p class='tag'>${tag}</p>
            </div>
          </div

          `;

          const champ = {
            img: img,
            champ: name,
            title: title,
            tag: tag,
          };

          const champs = JSON.parse(localStorage.getItem("champs"));
          champs.push(champ);
          localStorage.setItem("champs", JSON.stringify(champs));

          const star = {};
          const stars = JSON.parse(localStorage.getItem("stars"));
          stars.push(e.currentTarget.dataset.id);
          localStorage.setItem("stars", JSON.stringify(stars));
        });
      });

      function addHTML(champ) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.addEventListener("click", (e) => {
          const text = e.currentTarget.children[1].children[0].textContent;
          console.log(text);
          e.currentTarget.remove();
          let champs = JSON.parse(localStorage.getItem("champs"));
          champs = champs.filter((cp) => cp.text != text);
          localStorage.setItem("champs", JSON.stringify(champs));
        });

        const img = document.createElement("img");
        img.src = champ.img;

        const texts = document.createElement("div");
        texts.classList.add("texts");

        const name = document.createElement("h1");
        name.classList.add("name");
        name.textContent = champ.champ;

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = champ.title;

        const tag = document.createElement("p");
        tag.classList.add("tag");
        tag.textContent = champ.tag;

        wrapper.append(img);
        wrapper.append(texts);
        texts.append(name);
        texts.append(title);
        texts.append(tag);

        favorite.append(wrapper);
      }

      menuBtn.addEventListener("click", () => {
        favorite.classList.toggle("active");
        if (favorite.classList.contains("active")) {
          body.style.overflow = "hidden";
        } else {
          body.style.overflow = "auto";
        }
      });
    });
}

getData();
