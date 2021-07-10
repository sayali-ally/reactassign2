import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { getByTitle } from "@testing-library/react";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      postCategories: [],
      blog: [],
      categorySelected: "all",
      postsSelected: [],
    };
  }
  componentDidMount() {
    fetch("https://api.edyoda.com/v1/blog/postcategories/")
      .then((res) => res.json())
      .then((res) => this.setState({ postCategories: res }));
    fetch("https://api.edyoda.com/v1/blog/")
      .then((res) => res.json())
      .then((res) => this.setState({ blog: res, postsSelected: res }));
  }
  changeCategorySelected = (slug) => {
    if (slug === "all") {
      this.setState({
        postsSelected: this.state.blog,
        categorySelected: "all",
      });
    } else {
      this.setState({ categorySelected: slug });
      fetch(`https://api.edyoda.com/v1/blog/${slug}/`)
        .then((res) => res.json())
        .then((res) => this.setState({ postsSelected: res.posts }));
      console.log("here");
    }
  };

  render() {
    let month_at = (month) => {
      switch (month) {
        case "01":
          return "Jan";
          break;
        case "02":
          return "Feb";
          break;
        case "03":
          return "Mar";
          break;
        case "04":
          return "Apr";
          break;
        case "05":
          return "May";
          break;
        case "06":
          return "Jun";
          break;
        case "07":
          return "Jul";
          break;
        case "08":
          return "Aug";
          break;
        case "09":
          return "Sep";
          break;
        case "10":
          return "Oct";
          break;
        case "11":
          return "Nov";
          break;
        case "12":
          return "Dec";
          break;
        default:
          return "Default Case";
          break;
      }
    };
    return (
      <>
        <nav>
          <div className="logo">
            <div className="edyoda-logo">Edyoda</div>
            <p className="stories-logo">Stories</p>
          </div>
          <div className="nav-links">
            <ul className="categories-wrapper">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-toggle"
                  id="dropdown-basic"
                >
                  Explore Categories{" "}
                  <span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  {this.state.postCategories &&
                    this.state.postCategories.map(({ title, slug }) => {
                      return (
                        <Dropdown.Item
                          className="dropdown-item"
                          href={`#/${slug}`}
                          onClick={(e) => {
                            this.changeCategorySelected(slug);
                          }}
                        >
                          {title}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </ul>
            <ul className="right-menus">
              <div className="edyoda-text">
                <p>
                  EdYoda is free learning and knowledge <br /> sharing platform
                  for techies
                </p>
              </div>
              <div className="edyoda-signup">
                <button>Go To Main Website</button>
              </div>
            </ul>
          </div>
        </nav>
        <main>
          <div className="latest-posts-container">
            <h3 className="latest-posts-heading">Latest Posts</h3>
            <div className="category-filter-section">
              <div className="category-filter-heading">
                <div className="category-filter-icon">
                  <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                </div>
                <p className="category-filter-text">Filter by Category</p>
              </div>
              <div className="category-list">
                <div
                  className={
                    "all" === this.state.categorySelected
                      ? "category-item category-item-selected"
                      : "category-item"
                  }
                  id="all"
                  onClick={(e) => this.changeCategorySelected("all")}
                >
                  All
                </div>
                {this.state.postCategories &&
                  this.state.postCategories.map(({ title, slug }) => {
                    return (
                      <div
                        className={
                          slug === this.state.categorySelected
                            ? "category-item category-item-selected"
                            : "category-item"
                        }
                        id={slug}
                        onClick={(e) => this.changeCategorySelected(slug)}
                      >
                        {title}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="blog-card-section">
              {this.state.postsSelected &&
                this.state.postsSelected.length &&
                this.state.postsSelected.map(
                  ({
                    title,
                    description,
                    posted_on,
                    small_image,
                    authorname,
                  }) => {
                    return (
                      <div className="blog-card-container">
                        <div className="blog-image-container">
                          <img src={small_image} alt={title}></img>
                        </div>
                        <div className="blog-details-container">
                          <h3>{title}</h3>
                          <p>
                            {authorname}{" "}
                            <span className="blog-details-date">
                              {"| "}
                              {posted_on.slice(8, 10)}{" "}
                              {month_at(posted_on.slice(5, 7))}{" "}
                              {posted_on.slice(0, 4)}
                            </span>
                          </p>
                          <div>{description}</div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Main;