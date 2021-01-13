const User = function (username, countries) {
  this.username = username
  for (const country of countries) {
    this[country.alpha3Code] = {
      flagGame: "false",
      allGame: "false",
      capitalGame: "false"
    }
  }
}
module.exports = User;
