import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Config/config";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./user.css";

const Category = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  let token = localStorage.getItem("token");

  const getCategory = async () => {
    await axios
      .get(`${BASE_URL}/api/getCategory`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {});
  };
  const productDeta = (id) => {
    navigate("/productPage", {
      state: {
        catId: id,
      },
    });
    localStorage.setItem("catIdd", id);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="main-panel1">
        <div className="content-wrapper1">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={12} className="bordercss">
                <h1>Category</h1>
                {category.map((item) => (
                  <div className="row1" key={item._id}>
                    <div style={{ background: "#f6f6f6" }} className="column1">
                      {/* <a href={`/productPage/${item._id}`}> */}
                      {token !== null ? (
                        <a href="">
                          <img
                            onClick={() => productDeta(item._id)}
                            style={{ width: "205px", height: "213px" }}
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.name}
                          ></img>
                        </a>
                      ) : (
                        <a href="/login">
                          <img
                            style={{ width: "205px", height: "213px" }}
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.name}
                          ></img>
                        </a>
                      )}
                      <p className="catfooter">{item.name}</p>
                    </div>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Category;
