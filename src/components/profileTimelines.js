import React, { Component } from 'react';
import axios from "axios";
import Timelines from "./timelines";
import PostSkelton from "./PostSkelenton"

export class profileTimelines extends Component {

    state ={
        timelines:null
    }
    componentDidMount(){
        const name = this.props.userName
        axios.get(`user/${name}`)
        .then((res) =>{
            this.setState({
                timelines:res.data.timelinePost
            })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    render() {
        let timelineMarkup = this.state.timelines === null ?(
            <PostSkelton/>
        ):(
            this.state.timelines.map((timeline) => <Timelines key={timeline.timelineId} timeline={timeline} /> )
        )
        return timelineMarkup
    }
}

export default profileTimelines
