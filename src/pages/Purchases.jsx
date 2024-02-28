import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "react-bootstrap";
import { getPurchases } from "../store/purchases.slice";
import '../styles/purchases.css';
import { useNavigate } from "react-router-dom";


const Purchases = () => {

  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString()
  }

  const navigateToProduct = productId => {
    navigate(`/products/${productId}`);
  }

  return (
    <section>
      <h1 className="mb-5">My purchases</h1>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th style={{color: "white"}}>Product</th>
            <th style={{color: "white"}}>purchase date</th>
            <th style={{color: "white"}}>quantity</th>
            <th style={{color: "white"}}>Price</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase.id}>
              <td>
                <img
                  src={purchase.product?.productImgs?.[0]?.url}
                  alt=""
                  style={{ width: "100px", padding: " 10px", background: "#fff" }}
                />
              </td>
              <td>
                <b
                  onClick={() => navigateToProduct(purchase.product?.id)}
                  style={{ cursor: "pointer", color: "white" }}
                >
                  {purchase.product?.title}
                </b>
              </td>
              <td style={{color: "white"}}>{formatDate(purchase.createdAt)}</td>
              <td>
                <span className="border border-light py-2 px-4" style={{color: "white"}}>
                  {purchase.quantity}
                </span>
              </td>
              <td>
                <span className="text-bold text-success">
                  ${purchase.product?.price}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default Purchases