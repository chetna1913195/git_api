import React, { useState} from 'react';
import {Form,Card,Image,Icon} from 'semantic-ui-react';
import './Profile.css';



function Profile() {
  const [name,setName]=useState('');
  const [userName,setUserName]=useState('');
  const [followers,setFollowers]=useState('');
  const [following,setFollowing]=useState('');
  const [repos,setRepos]=useState('');
  const [avatar,setAvatar]=useState('');
  const [userInput,setUserInput]=useState('');
  const [errors,setErrors]=useState(null);
 
const setData =({name,login,followers,following,public_repos,avatar_url})=>{
setName(name);
setUserName(login);
setFollowers(followers);
setFollowing(following);
setRepos(public_repos);
setAvatar(avatar_url)
}

 const handleInput=(e)=>{
   setUserInput(e.target.value)
 } 
 const handleSubmit=()=>{
   fetch(`https://api.github.com/users/${userInput}`)
   .then(res=>res.json())
   .then(data=>{
     if(data.message){
       setErrors(data.message)
     }
     else{
       setData(data);
       setErrors(null)
     }
    setData(data);
   })
  }
  
  return (
    <div>
    <div className="navbar" >
      <h1>
      <i aria-hidden="true" class="github icon"></i>
     Search Github Users
      </h1> 
    </div>

      <div className="input">
      <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Github user' name='Github user'  onChange={handleInput}/>
             <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
     
     {errors ? (<h1>{errors}</h1>) : ( <div className="card">
      <Card>
    <Image src={avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Header>{userName}</Card.Header>

    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {followers} Followers
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user'  />
      {repos} Repos
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {following} following
      </a>
    </Card.Content>
   
  </Card>
      </div>)}
    
     
    </div>
  );
  }

export default Profile;
