import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "./Post"
import '../styles/index.css';

function App() {
  const [posts, setPosts]: [any, any] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories]: [string[], any] = useState([])
  const [visible, setVisible] = useState(9)

  // GET Request
  // Runs when the component mounts and updates 
  // Empty brackets placed at the end of the function is to prevent infinite loop
  useEffect(() => {
    axios.get("/api/posts").then(function (response) {

      // Sets data into posts
      setPosts(response.data.posts);

      // Get all categories
      var categoriesList: Array<String> = ["All"]
      response.data.posts.forEach(post => {
        post.categories.forEach(category => {
          if(!categoriesList.includes(category.name)){
            categoriesList.push(category.name)
          }
        });
      });

      // Sets categories into categoryList
      setCategories(categoriesList);
    })
    .catch((error) => console.log(error));
  }, []);

  // Show more function to load more results => pagination
  function showMore() {
    setVisible(visible + 9)
  }

  // Checks if category is alreasy selected => returns a boolean value
  function isSelected(post){
    return post.categories.some(c => c.name === selectedCategory)
  }

  // Returns all post => default category
  function all(){
    return (
      <div>
        <div className="grid">
          {
            posts.slice(0, visible).map(function(post: any){
              return <Card key={post.id} {...{post: post}}/>
            })
          }
        </div>
        {
          visible < posts.length &&
          <div onClick={showMore} className="show-more">Show more</div>
        }
      </div>
    )
  }

  // Validates if category is already selected before changing UI
  function newCategory(){
    return (
      <div>
        <div className="grid">
          {
            posts.filter((post) => isSelected(post)).slice(0, visible).map(function(p: any){
              return <Card key={p.id} {...{post: p}}/>
            })
          }
        </div>
        {
          visible < posts.filter((post) => isSelected(post)).length &&
          <div onClick={showMore} className="show-more">Show more</div>
        }
      </div>
      
    )
  }

  return (
    <div id="main">
      <h1 className="title">Lizard Global Assessment - Vignnesh Ravindran</h1>
      <div id='categoryList'>
        {categories.map((category:string) => 
          <div key={category.toString()} onClick={() => {setSelectedCategory(category); setVisible(9)}} className={category === selectedCategory ? "selected" : "notSelected"}>{category}</div>
        )}
      </div>
      <hr />
      {selectedCategory === "All" ? all() : newCategory()}
      <div id='circular-progress'>
        <span className='progress-value'></span>
      </div>
    </div>
  )
}

export default App;
