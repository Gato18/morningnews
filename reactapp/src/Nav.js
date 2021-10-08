import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Menu, Icon, Badge } from "antd";
import { connect } from "react-redux";

function Nav(props) {
  return (
    <nav>
      <Menu style={{ textAlign: "center" }} mode="horizontal" theme="dark">
        <Menu.Item key="mail">
          <Link to="/screensource">
            <Icon type="home" />
            Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenmyarticles">
            <Icon type="read" />
            <Badge className="badge" style={{ backgroundColor: "#108ee9" }} count={props.articleLiked.length}>
              My Articles
            </Badge>
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/">
            <Icon type="logout" />
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

function mapStateToProps(state) {
  return { articleLiked: state.wishList, token: state.token };
}

export default connect(mapStateToProps, null)(Nav);
