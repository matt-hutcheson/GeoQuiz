const User = function (username, countries) {
  this.username = username
  this.id = null
  for (const country of countries) {
    this[country.alpha3Code] = {
      flagGame: false,
      allGame: false,
      capitalGame: false
    }
  }
}
module.exports = User;
