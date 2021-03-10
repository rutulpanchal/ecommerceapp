import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Shoppage from './pages/shoppage/shoppage.component';
import Header from './components/header.component/header.component';
import SignInSignUp from './pages/signInandSignUpPage/sign-InandSign-UpPage.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';


class  App extends React.Component {
  constructor(){
    super();
    this.state ={
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){ return (
    <div>
      
      <Router>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        
        <Route path='/shop' component={Shoppage} />
        <Route path='/signin' component={SignInSignUp} />
      </Switch>
      </Router>
    </div>
  );}
   
  
}

export default App;
