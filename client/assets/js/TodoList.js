/**
 * @jsx React.DOM
 */

var React = require('react');
var $ = require('jquery');

$.ajaxSetup({ cache: false });

var TodoList = React.createClass({
	getInitialState : function(){
		return { todos : [], title : '' }
	},
	componentDidMount : function(){
		$.get('/api/todos').done(function(json){
			this.setState({ todos : json})
		}.bind(this))
	},
	onChange: function(e) {
    	this.setState({title: e.target.value});
  	},
	add : function(){
		var title = this.state.title;
		$.post('/api/todos', { title : title, competed : false })
		 .done(function(json){
		 	this.state.todos.push(json);
			this.setState({ todos : this.state.todos, title : ''});
		 }.bind(this));
	},
	remove : function(todo, index){
		$.ajax({
			url : '/api/todos/' + todo.id,
			
			type : 'DELETE'
		}).done(function(){
			this.state.todos.splice(index, 1);
			this.setState({ todos : this.state.todos})
		}.bind(this))
	},
	toggle : function(todo, index){
		this.state.todos[index].competed = !this.state.todos[index].competed;
		$.ajax({
			url : '/api/todos/' + todo.id,
			type : 'PUT',
			contentType:"application/json",
			data : JSON.stringify(this.state.todos[index])
		}).done(function(){
			this.setState({ todos : this.state.todos})
		}.bind(this))
	},
	render: function() {
		var items = this.state.todos.map(function(todo, index){
			return (<div className="item">
				<label>
					<input checked={todo.competed} onChange={this.toggle.bind(this, todo, index)} type="checkbox"/>
					{todo.title}
				</label>
				<button onClick={this.remove.bind(this, todo, index)}>remove</button>
			</div>)
		}.bind(this))
		return (
			<div>
				{items}
				<div className="add-row">
					<input onChange={this.onChange} value={this.state.title} type="text" />
					<button onClick={this.add}>add</button>
				</div>
			</div>

		);
	}

});

module.exports = TodoList;