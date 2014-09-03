/** @jsx React.DOM */
var React = require('react/addons'); 
var	ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TodoList = require('./TodoList')
var App = {};

App.start = function () {
    React.renderComponent(<TodoList/>, document.getElementById('app'));
};

module.exports = window.App = App;
