import React from 'react'
import '../styles/post.css';

class Card extends React.Component<{}, {post: any}>{
    constructor(props) {
        super(props)
        this.state = {post: props.post}
    }
    
    render(){
        return(
            <div className='card'>
                <div className='avatar'>
                    <img src={this.state.post.author.avatar} alt="Author"/>
                </div>
                <div className='author'>
                    <span className='name'>{this.state.post.author.name}</span>                
                    <span className='timestamp'>{this.state.post.publishDate}</span>
                </div>
                <div className='title1'>
                    <h2>{this.state.post.title}</h2>
                </div>
                <div className='summary'>
                    <p>{this.state.post.summary}</p>
                </div>
                
                <div className='categories'>
                    {
                        this.state.post.categories.map(
                            function(category:any){
                                return <div key={category.id}>{category.name}</div>
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Card