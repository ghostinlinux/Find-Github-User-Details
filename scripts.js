let getUserNameId = document.getElementById("username");
let button = document.getElementById("btn");
let userinfo = document.getElementById("userinfo");

button.addEventListener("click", getGithubDetails);

function getGithubDetails() {
  if (getUserNameId.value.length > 0) {
    let getUserName = getUserNameId.value;
    let url = `https://api.github.com/users/${getUserName}`;
    let url2 = `https://api.github.com/users/${getUserName}/repos`;
    const request = new XMLHttpRequest();
    const request2 = new XMLHttpRequest();
    request.open("GET", url, true);
    request2.open("GET", url2, true);
    request.addEventListener("load", function () {
      if (request.status === 200) {
        let values = JSON.parse(request.responseText);
        let userInfo = [
          values.name,
          `(@${values.login})`,
          values.avatar_url,
          values.followers,
          values.following,
          values.public_repos,
        ];

        // name and username
        let hr = document.createElement("hr");
        userinfo.appendChild(hr);
        let githubName = document.createElement("div");
        githubName.textContent = `${userInfo[0]} ${userInfo[1]}`;
        userinfo.appendChild(githubName);

        //profilepic
        let githubPic = document.createElement("div");
        githubPic.setAttribute("id", "picdiv");
        let githubImage = document.createElement("img");
        githubImage.setAttribute("id", "image");
        githubImage.src = userInfo[2];
        githubPic.appendChild(githubImage);

        // followers, following,repos
        let follower = document.createElement("span");
        follower.textContent = `Followers : ${userInfo[3]} || Following : ${userInfo[4]} || Repositories : ${userInfo[5]} `;
        githubPic.appendChild(follower);
        userinfo.appendChild(githubPic);

        // Request2
        request2.addEventListener("load", function () {
          if (request2.status === 200) {
            // second part - repos list
            let heading = document.createElement("h4");
            heading.textContent = "Repos List : ";
            userinfo.appendChild(heading);

            let values = JSON.parse(request2.responseText);
            let divrepos = document.createElement("div");
            divrepos.setAttribute("id", "divrepos");
            values.forEach((element) => {
              let reposelement = document.createElement("span");
              reposelement.setAttribute("class", "reposbox");
              reposelement.textContent = element.name;
              divrepos.appendChild(reposelement);
            });
            userinfo.appendChild(divrepos);
            let hr = document.createElement("hr");
            userinfo.appendChild(hr);
          }
        });
      } else {
        console.log("Wrong Username");
      }
    });

    request.send();
    request2.send();
  }
}
