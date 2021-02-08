import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {Link} from 'react-router-dom';

class WorkforceDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {FullList: [], isLoading : true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount(){
        this.setState({isLoading:true});

        fetch('api/FullList')
            .then(response => response.json())
            .then(data => this.setState({FullList: data, isLoading: false}));
    }

    render(){
        const {groups, isLoading} = this.state;
        if(isLoading){
            return <div>is loading.....</div>;
        }

        const returnWorkers = FullList.map(workers => {
            const name = '${grou}'
        })


    }

}

export default WorkforceDisplay;