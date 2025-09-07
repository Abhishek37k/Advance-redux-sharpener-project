import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const dummyProducts = [
    { id: 'p1', title: 'My first Book', price: 6, description: 'My first Book - amazing!' },
    { id: 'p2', title: 'My second Book', price: 5, description: 'My second Book - amazing!' },
    { id: 'p3', title: 'My third Book', price: 4, description: 'My third Book - amazing!' },
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
      {dummyProducts.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      ))}
      </ul>
    </section>
  );
};

export default Products;
