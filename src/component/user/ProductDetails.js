import { useLocation } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../Config/config";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Grid } from "@mui/material";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
toast.configure();

function authHeader() {
  const user = localStorage.getItem("token");
  if (user) {
    return { Authorization: `Bearer ${JSON.parse(user)}` };
  } else {
    return {};
  }
}

const ProductDetails = () => {
  const location = useLocation();
  let ProductId = location.state.ProductId;
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);

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

  function increaseQuantity(id) {
    setCount(count + 1);
  }
  function decreaseQuantity(id) {
    if (count <= 1) {
    } else {
      setCount(count - 1);
    }
  }
  function addToCart(id, data) {
    const userId = localStorage.getItem("id");
    const requestData = {
      userId: userId,
      cart: [
        {
          product: id,
          quantity: data,
        },
      ],
    };
    axios
      .post(`${BASE_URL}/api/addTocart`, requestData, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Item added to cart");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Something went wrong..");
        }
      });
  }

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
                  <a href="/productPage" className="colorlin">
                    <ArrowBackIosIcon className="Arrowdown" />
                  </a>
                  <h1>Products Details</h1>
                </div>
                {product.map((item) => (
                  <div className="row12" key={item._id}>
                    <div className="column1">
                      {item._id === ProductId ? (
                        <div style={{ display: "inline-flex" }}>
                          <img
                            style={{
                              width: "235px",
                              height: "274px",
                              borderRadius: "10px",
                            }}
                            src={`${BASE_URL}/${item.image}`}
                            alt={item.name}
                          ></img>
                          <div className="procss">
                            <div className="proflex">
                              <p>Name : </p>
                              <p className="fontcs">&nbsp;{item.name}</p>
                            </div>
                            <div className="proflex">
                              <p> Desc : </p>
                              <p className="fontcsS">
                                &nbsp;{item.description}
                              </p>
                            </div>
                            <div className="proflex">
                              <p> Price : </p>
                              <p className="fontcolorcs">&nbsp;${item.price}</p>
                            </div>
                            <div className="cssinline">
                              <p className="proflex">Quantity :</p>&nbsp;
                              <div style={{ display: "inline-flex" }}>
                                <div className="borderCart">
                                  <button
                                    className="buttIcon"
                                    onClick={() => decreaseQuantity(item._id)}
                                  >
                                    <RemoveIcon style={{ fontSize: "30px" }} />
                                  </button>
                                  &emsp;
                                  <span style={{ fontSize: "23px" }}>
                                    {count}
                                  </span>
                                  &emsp;
                                  <button
                                    className="buttIcon"
                                    onClick={() => increaseQuantity(item._id)}
                                  >
                                    <AddIcon style={{ fontSize: "30px" }} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="AddToCart">
                              <button
                                type="submit"
                                onClick={() => addToCart(item._id, count)}
                                className="detailPro"
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                        </div>
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

export default ProductDetails;
