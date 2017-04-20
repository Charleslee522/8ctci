 // Author: racerKim

var ParsedCommands = function() {
  if (!(this instanceof ParsedCommands)) {
    return new ParsedCommands();
  }

  _query = null;
  _time = null;
  _name = null;
  _description = null;
  _on = null;
  _off = null;
  _remove = null;
  _list = null;

  ParsedCommands.prototype.setQuery = function(query) {
    _query = query;
  }

  ParsedCommands.prototype.getQuery = function() {
    return _query;
  }

  ParsedCommands.prototype.setTime = function(time) {
    _time = time;
  }

  ParsedCommands.prototype.getTime = function() {
    return _time;
  }

  ParsedCommands.prototype.setName = function(name) {
    _name = name;
  }

  ParsedCommands.prototype.getName = function() {
    return _name;
  }

  ParsedCommands.prototype.setDesc = function(description) {
    _description = description;
  }

  ParsedCommands.prototype.getDesc = function() {
    return _description;
  }

  ParsedCommands.prototype.setOn = function(on) {
    _on = on;
  }

  ParsedCommands.prototype.getOn = function() {
    return _on;
  }

  ParsedCommands.prototype.setOff = function(off) {
    _off = off;
  }

  ParsedCommands.prototype.getOff = function() {
    return _off;
  }

  ParsedCommands.prototype.setRemove = function(remove) {
    _remove = remove;
  }

  ParsedCommands.prototype.getRemove = function() {
    return _remove;
  }

  ParsedCommands.prototype.setList = function(list) {
    _list = list;
  }

  ParsedCommands.prototype.getList = function() {
    return _list;
  }

}

module.exports = ParsedCommands;
