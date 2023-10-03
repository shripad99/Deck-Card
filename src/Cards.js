import React, { Component } from 'react';
import axios from 'axios';

export default class Cards extends Component {
    constructor() {
        super();
        this.state = {imagesArray : [], deck_id: " ", remaining: " "}
    }
    getCard() {
        axios.get("https://www.deckofcardsapi.com/api/deck/new/shuffle/").then((data) =>
            this.setState({
                deck_id: data.data.deck_id,
                remaining: data.data.remaining,
            }),
        );
    }
    componentDidMount() {
        this.getCard();
    }
    giveMeCard() {
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`).then((data) =>
            this.setState({
                imagesArray: [...this.state.imagesArray, data.data.cards[0].image],
                remaining: data.data.remaining,
            })
            );
        console.log(this.state.imagesArray)
    }
    render() {
        return (
            <div className='deck-board'>
            {this.state.remaining ? (
                <button onClick={() => this.giveMeCard()}>Give me Card</button>
            ):("")}
                <div className='card-list'>
                    {this.state.imagesArray.map((card, index) =>{
                        return(
                            <img src={card} key={index} id={index} alt={card} className='card-image' />
                        )
                    })}
                </div>
            </div>
        )
    }
}
