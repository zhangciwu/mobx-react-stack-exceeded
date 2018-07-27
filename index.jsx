import {observer, inject, Provider, useStaticRendering} from "mobx-react"
import {Component} from 'react'
import {renderToString} from 'react-dom/server';
import * as mobx from "mobx";
import * as React from "react";

useStaticRendering(true);

class NameDisplayer extends Component {
	render() {
		return <h1>{this.props.name}</h1>
	}
}

function getWraped() {
	let r = inject(stores => ({
		name: stores.userStore.name
	}))(observer(NameDisplayer));
	//    ^^^^^  NameDisplayer got altered

	return r;
}

const user = mobx.observable({
	name: "Noa"
})

class Name2 extends Component {
	render() {
		let UserNameDisplayer = getWraped();
		return <div><UserNameDisplayer/></div>
	}
}

function getHtml() {
	return renderToString(
		<Provider userStore={user}>
			<Name2/>
		</Provider>
	)
}

for (let i = 0; i < 50000; i++) {
	console.log(i, getHtml())
}
