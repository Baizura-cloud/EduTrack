import React, {Component} from "react";
import { Button } from "@mui/material";
import { supabase } from "../client";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  async signoutUser() {
    try {
      const { error } = await supabase.auth.signOut().then(console.log('signout'))
    } catch (error) {
      console.log(error);
    }
  }
  render(){
    return(
      <div>
        Logged In!
        <Button onClick={this.signoutUser}>
          Log Out
        </Button>
      </div>
    )
  }
}

export default Main;

