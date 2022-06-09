window.onload = function(e) {
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const name = data.results[0].name;
      const full_name = `${name.title} ${name.first} ${name.last}`;
      document.getElementById('full_name').innerHTML = full_name;
  });
};
