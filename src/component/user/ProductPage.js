import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router";
import { BASE_URL } from "../../Config/config";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Header from "./Header";

function authHeader() {
  const user = localStorage.getItem("token");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}

const ProductPage = () => {
  //   const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  let getCatId = localStorage.getItem("catIdd");
  //   let categoryId = location.state.catId;

  const getProduct = async () => {
    await axios
      .get(`${BASE_URL}/api/getProducts`, {
        headers: authHeader(),
      })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {});
  };
  const productDetails = (id) => {
    navigate("/productDetails", {
      state: {
        ProductId: id,
      },
    });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header />
      <div className="main-panel1">
        <div className="content-wrapper1">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={12} className="bordercss">
                <div className="arrowLeft">
                  <a href="/" className="colorlin">
                    <ArrowBackIosIcon className="Arrowdown" />
                  </a>
                  <h1>Products</h1>
                </div>
                {product.map((item) => (
                  <div className="row1" key={item._id}>
                    <div className="column1">
                      {item.cat_id === getCatId ? (
                        <a href="">
                          <img
                            onClick={() => productDetails(item._id)}
                            style={{ width: "205px", height: "213px" }}
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.name}
                          ></img>
                          <h3>{item.name}</h3>
                        </a>
                      ) : (
                        ""
                      )}
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

export default ProductPage;
