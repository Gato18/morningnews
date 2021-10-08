import React, { useState } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";

import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function removeToWishList(title) {
    var result = await fetch("/deleteToWishlist", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "token=" + props.token + "&title=" + title,
    });
    if (await result.json()) {
      props.deleteToWishList(title);
    }
  }

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  var noArticles;
  if (props.myArticles == 0) {
    noArticles = <div style={{ marginTop: "30px" }}>No Articles</div>;
  }

  return (
    <div>
      <Nav />

      <div className="Banner" />

      {noArticles}

      <div className="Card">
        {props.myArticles.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[<Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.content)} />, <Icon type="delete" key="ellipsis" onClick={() => removeToWishList(article.title)} />]}>
              <Meta title={article.title} description={article.description} />
            </Card>
            <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
              <p>{content}</p>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { myArticles: state.wishList, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({ type: "deleteArticle", title: articleTitle });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
