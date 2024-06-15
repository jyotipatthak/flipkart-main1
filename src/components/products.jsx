import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, addToWishlist, removeFromWishlist, addToBookmark, removeFromBookmark } from '../redux/actions';
import PriceFilter from '../filters/pricefilter';
import Search from '../ui/Searchbar';
import ProductModal from '../filters/ProductModal';
import { FaBookmark, FaHeart } from 'react-icons/fa';

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cart = useSelector(state => state.cart);
  const wishlist = useSelector(state => state.wishlist);
  const bookmark = useSelector(state => state.bookmark);
  const dispatch = useDispatch();

  const applyRandomPriceChange = (price) => {
    const changePercentage = (Math.random() - 0.5) * 0.2; // -10% to +10%
    return price + (price * changePercentage);
  };

  const applyRandomDiscount = () => {
    return Math.floor(Math.random() * 21); // 0% to 20%
  };

  const fetchProducts = async (category = null) => {
    try {
      setIsLoading(true);
      let url = 'http://localhost:8000/api/products';
      if (category) {
        url = `http://localhost:8000/api/products/category/${encodeURIComponent(category)}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      // Apply random price changes and discounts
      const productsWithPriceChanges = data.map(product => {
        const newPrice = applyRandomPriceChange(product.price);
        const discount = applyRandomDiscount();
        const discountedPrice = newPrice - (newPrice * (discount / 100));
        return {
          ...product,
          price: newPrice,
          discount,
          discountedPrice
        };
      });

      setProducts(productsWithPriceChanges);
      setFilteredProducts(productsWithPriceChanges);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(prevCategory => prevCategory === category ? null : category);
  };

  const handleSearch = (title) => {
    const filtered = products.filter(product => product.title.toLowerCase().includes(title.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    const filtered = products.filter(product => {
      const price = product.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });
    setFilteredProducts(filtered);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    // console.log(cart)
    dispatch(addItemToCart(product));
    // console.log()
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleBookmark = (product) => {
    if (bookmark[product.id]) {
      dispatch(removeFromBookmark(product.id));
    } else {
      dispatch(addToBookmark(product));
    }
  };

  const handleWishlist = (product) => {
    if (wishlist[product.id]) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-4">
      <nav className="w-full bg-slate-400 text-white p-4 flex flex-col md:flex-row items-center justify-between rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <p
                key={index}
                className={`text-sm font-bold cursor-pointer px-4 py-1 rounded-lg transition-colors ${
                  category === selectedCategory ? 'bg-[#1a2259] text-white' : 'bg-white text-blue-700 hover:bg-blue-200'
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full ml-12 items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <Search onSearch={handleSearch} />
          <PriceFilter onFilter={handlePriceFilter} />
        </div>
      </nav>

      <div className="flex-1 flex flex-col mt-4">
        <div className="flex flex-wrap -m-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
                <div className="bg-white border rounded-lg shadow-lg flex flex-col items-center p-4">
                  <img
                    className="h-40 w-full mb-4 rounded cursor-pointer object-contain"
                    src={product.image}
                    alt={product.title}
                    onClick={() => handleImageClick(product)}
                  />
                  <div className="absolute top-2 left-2 mt-4 ml-4 flex gap-2">
                    <FaBookmark
                      className={`text-2xl cursor-pointer ${bookmark[product.id] ? 'text-black' : 'text-red-500'}`}
                      onClick={() => handleBookmark(product)}
                    />
                    <FaHeart
                      className={`text-2xl cursor-pointer ${wishlist[product.id] ? 'text-black' : 'text-red-500'}`}
                      onClick={() => handleWishlist(product)}
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-500 mt-4 mr-4 text-white text-xs font-semibold p-1 rounded">
                    {product.discount}% OFF
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">{product.title}</h3>
                  <p className="text-sm mb-2 text-center line-clamp-3">{product.description}</p>
                  <div className="flex gap-4 items-center w-full justify-center mt-auto">
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-gray-900 mb-2 mr-2 line-through">${product.price.toFixed(2)}</p>
                      <p className="text-lg font-semibold text-red-500 mb-2">${product.discountedPrice.toFixed(2)}</p>
                    </div>
                    {product.id in cart ? (
                      <button
                        className="bg-blue-900 text-white px-4 py-1 rounded-lg font-bold text-sm hover:bg-blue-900 transition"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove Item
                      </button>
                    ) : (
                      <button
                        className="bg-indigo-700 text-white px-4 py-1 font-bold text-sm rounded-lg hover:bg-indigo-900 transition"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {isModalOpen && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      </div>
    </div>
  );
}

export default Product;
