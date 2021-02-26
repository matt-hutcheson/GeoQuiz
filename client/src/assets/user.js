const User = function (username, password, countries) {
  this.username = username;
  this.password = password;
  this.results = [];

  for (const country of countries) {
    this.results.push({
      alpha3Code: country.alpha3Code,
      flagGame: "false",
      allGame: "false",
      capitalGame: "false"
    })
  }
}
module.exports = User;
